export const rootUrl = "https://google.com";

function isValidDomain(domain: string) {
  const domainRegex =
    /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  return domainRegex.test(domain);
}

export const formatTerm = (term: string) =>
  term.replace("https://", "").replace("http://", "").replace("www.", "");

export function formatUrl(value: string) {
  const term = `${formatTerm(value)}`;

  if (/^(http:\/\/|https:\/\/)/.test(value)) {
    return {
      url: value,
      term,
    };
  }

  // If the URL is a valid domain but doesn't start with a protocol, prepend https://
  if (isValidDomain(value)) {
    return {
      url: `https://${value}`,
      term,
    };
  }

  return {
    url: `${rootUrl}/search?q=${encodeURIComponent(value)}`,
    term: `${formatTerm(rootUrl)}/search?q=${encodeURIComponent(value)}`,
  };
}
