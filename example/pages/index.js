import Switch from "../components/Switch";
import { useAsyncToggle } from '../../use-async-toggle';

import hookConfig from '../../use-async-toggle/package.json';

export default function Index() {
  const { name, description, repository = {}, author = {} } = hookConfig;

  const { name: authorName, url: authorUrl } = author;

  const { url: repositoryUrl } = repository;
  const repositoryExists = typeof repositoryUrl === 'string';

  const repositoryUrlDisplay = repositoryExists && repositoryUrl.split('://')[1];

  const { on, getTogglerProps, forwardError } = useAsyncToggle({});
  const delay = (data, ms) =>
    new Promise((resolve) => setTimeout(() => resolve(data), ms));


  return (
    <main>
      <style jsx global>{`
        body {
          font-family: sans-serif;
          padding: 0;
          margin: 0;
        }

        main {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1em 0;
        }

        h1 {
          font-size: 2em;
        }

        img {
          max-width: 100%;
        }

        pre {
          overflow: auto;
          max-height: 15em;
          background-color: #eeeeee;
          padding: 1em;
        }

        section,
        footer {
          width: 100%;
          max-width: 50em;
          margin: 0 auto;
        }

        footer p {
          font-size: .9em;
        }

        footer p,
        footer a {
          color: #546e7a;
        }
      `}</style>

      <section>

        <h1>{ name }</h1>

        <p>{ description }</p>

        { repositoryExists && (
          <p>
            <a href={repositoryUrl}>
              { repositoryUrlDisplay }
            </a>
          </p>
        )}

        <h2>How to use</h2>

        <p>
          Please see the `/example` directory for usage details 
        </p>

        <h2>Examples</h2>

        <h3>Set and get async toggle status</h3>
        <p>
          <strong>Input:</strong>
        </p>
        <pre>
          <code>
          {`
const { on,pending, getTogglerProps, forwardError } = useAsyncToggle({});
/* * * * * * 
*
* on: indicates the status of the toggle , can be true or false, and is automatically set.
* pending: indicates the loading status in case of async functions, can be true or false, and is automatically set.
* getTogglerProps: can take a onClick function (both regular and async) and appends to the exisiting toggle logic
* forwardError(e): to be called in case error for custom onClick is being handled externally
*
* * * * * * */
          `}
          </code>
        </pre>
        <p>
          <strong>Output:</strong>
        </p>
        <div>
      <Switch
        {...getTogglerProps({
          onClick: async () => {
            await delay(!on, 2000)
              .then(() => {
                console.log("Updated successfully, call a success toast maybe");
                //  uncomment below line to see custom error handling
                // throw new Error("some error");
              })
              .catch((e) => {
                console.log(
                  "Updated un-successfully, call a error toast maybe"
                );
                forwardError(e);
              });
          }
        })}
      />
    </div>
      </section>

      <footer>
        <p>
          Made by <a href={authorUrl}>{ authorName }</a>
        </p>
      </footer>
    </main>
  );

}