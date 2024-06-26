import { trace } from '@opentelemetry/api'
export const dynamic = 'force-dynamic'

async function fetchData(shouldFail: number) {

  // slow request
  if (shouldFail === 1) {
    await fetch('https://httpstat.us/200?sleep=5000')
  }

  // hard error
  if (shouldFail === 5) {
    throw new Error("Error calling API");
  }

  // wrong url
  if (shouldFail === 10) {
    await fetch('https://nonexistenturl.com');
  }

  let res: any
  await trace
    .getTracer('nextjs-server')
    .startActiveSpan('fetchJsonPlaceholder', async (span) => {
      try {
        res = await fetch("https://jsonplaceholder.typicode.com/posts");
      } finally {
        span.addEvent('fetchJsonPlaceholder was called', {
          provider: 'jsonplaceholder',
          someKey: 'someValue',
        })
        span.end()
      }
    })


  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const jsonData = await res.json();
  return jsonData;
}

export default async function SimpleSSRComponent() {
  const currentDate = new Date().toUTCString();
  const shouldFail = Math.floor((Math.random() * 10) + 1);

  const data = await fetchData(shouldFail);
  return (
    <div>
      <h1>Today is {currentDate}</h1>
      <ul>
        {data.map((item: any) => (
          <div style={{ marginBottom: "20px" }} key={item.id}>
            {" "}
            <b>
              {item.id}. {item.title}
            </b>
            <p>{item.body}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}
