import Groq from "groq-sdk";

import { db, eq, schema } from "@appli/db";

import { env } from "~/env";

const handler = async (req: Request) => {
  const body = (await req.json()) as {
    html: string;
    url: string;
    apiKey: string;
  };

  const groq = new Groq({
    apiKey: env.GROQ_API_KEY,
  });

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          'You are a job application API capable of HTML analysis that responds in JSON. Each string must not exceed 200 characters. The JSON schema should include\n    {\n        "jobTitle": "string",\n        "description": "string",\n        "salary": "string",\n        "location": "string",\n        "company": "string",\n      "companyURL": "string",\n        "technologies": "array",\n    }\n',
      },
      {
        role: "user",
        content: `Return a JSON by parsing this HTML:\n${body.html}`,
      },
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.5,
    max_tokens: 1024,
    top_p: 1,
    response_format: { type: "json_object" },
  });

  const { jobTitle: title, ...jobApplication } = JSON.parse(
    chatCompletion?.choices?.[0]?.message?.content ?? "",
  ) as {
    jobTitle: string;
    description: string;
    salary: string;
    location: string;
    company: string;
    companyURL: string;
    technologies: string[];
  };

  const result = await db
    .select({
      id: schema.users.id,
    })
    .from(schema.users)
    .where(eq(schema.users.apiKey, body.apiKey));

  if (!result[0]) {
    return Response.json({ message: "User not found." }, { status: 404 });
  }

  await db.insert(schema.applications).values({
    ...jobApplication,
    title,
    url: body.url,
    rawDescription: body.html,
    savedAt: new Date(),
    userId: result[0].id,
  });

  return Response.json({ message: "Saved job application." });
};

export { handler as POST };
