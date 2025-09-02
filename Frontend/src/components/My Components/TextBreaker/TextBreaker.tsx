type props = {
  text: string | undefined;
  chunkSize: number;
};
const TextBreaker = ({ text, chunkSize }: props) => {
  // Split the text into an array of chunks
  const chunks = [];
  if (text) {
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.slice(i, i + chunkSize));
    }

    return (
      <div>
        {chunks.map((chunk, index) => (
          <div key={index}>{chunk}</div>
        ))}
      </div>
    );
  } else {
    return '';
  }
};
export default TextBreaker;
