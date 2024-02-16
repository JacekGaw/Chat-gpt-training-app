import DOMPurify from "dompurify";

export default function messageFormatter(responseContent) {
  const tokens = responseContent.split(/(```[\s\S]*?```)/g);

  return (
    <div>
      {tokens.map((token, index) => {
        if (token.startsWith("```")) {
          const sanitizedSnippet = DOMPurify.sanitize(token.slice(3, -3));
          const firstword = sanitizedSnippet.split("\n")[0];
          console.log(firstword);
          const newsanitizedSnippet = sanitizedSnippet
            .split("\n")
            .slice(1)
            .join("\n");
          return (
            <div key={index}>
                <p key={index} className="bg-gray-600 rounded-t-lg p-2 text-xs">Code snippet in: {firstword}</p>
            <pre
              key={index}
              className="bg-black p-5 rounded-b-lg overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: newsanitizedSnippet }}
            />
            </div>
          );
        } else {
          return <span key={index}>{token}</span>;
        }
      })}
    </div>
  );
}
