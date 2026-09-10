export async function getContributions(username: string) {
  const res = await fetch(
    `${
      process.env.GITHUB_CONTRIBUTIONS_API_URL ||
      "https://github-contributions-api.jogruber.de"
    }/v4/${username}?y=2026`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!res.ok) {
    return [];
  }

  const data = await res.json();

  return data.contributions ?? [];
}