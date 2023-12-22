I learned how to clone a github repository, pull from github to VsCode, push from VsCode back to github, and resolve merge conflicts.

DOM's or Data Object Models are programming interfaces for web documents. THey represent the structure of an HTML od XML document with a tree like structure, where each node represents a part of the document (elements, attributes, text). It provides a way from programs like JavaScript to interact with the structure, content, and style of web documents.

In JavaScript "#" usually is used to identify elements in an HTML file. For example

        <label for="code">Code:</label>
        <input type="text" id="code" placeholder="input code here" />
        <button type="button" onclick="redeem()">Redeem</button>

    this is the HTML for the input box "code"

          const code = document.querySelector("#code").value;
        
    this is the JavaScript line which takes whatever string is submitted in the box and sets it as a new variable which can be used.

They can also just be comments, or can be used to denot hexidecimal values for colors.

Difference between the #title and .grid selectors:
#title is an ID selector, so it should be fairly specific. There really shouldnt be multiple elements with the same ID. However .grid is a class selector, which is normally applied to multiple elements in a page. Also, ID selectors take precendence over class selectors, so if you have an ID selector that changes an element that is also part of a class, the ID selector changes will override class selector changes.

The <link> element in HTML is used to define relationships between the current document and an external resource. They are used for: 
    CSS stylesheets
    Favicons
    Alternate stylesheets
    Prefetching and Preloading
    DNS prefetching
    External Scripts

The <div> tag is really versatile element used for creating divisions or sections in a web page. It can be used for:
    Creating sections or containers
    Styling and layout
    Grouping other elements
    Responsive elements

port 443 is for HTTPS, port 80 is for HTTP, and port 22 is for SSH

Command line arguments
chmod: Changes permissions of a file or directory.
pwd: Prints the current working directory.
cd: Changes the current directory.
ls: Lists files and directories in the current directory.
vim and nano: Text editors in the terminal.
mkdir: Creates a new directory.
mv: Moves or renames files or directories.
rm: Removes (deletes) files or directories.
man: Displays the manual of a command.
ssh: Connects to a remote server via Secure Shell.
ps: Shows the currently running processes.
wget: Downloads files from the web.
sudo: Executes a command with elevated privileges.

The -la parameter in ls shows a detailed list of all files, including hidden files, with permissions, ownership, and more information.

A web certificate (SSL/TLS certificate) is required to enable HTTPS on a website, ensuring secure communication by encrypting data between the server and the client.

A DNS A record maps a domain name to an IP address, and it can point directly to an IP address or to another A record, which ultimately resolves to an IP address.

JSON is a lightweight data-interchange format that is easy for humans to read and write. It's based on JavaScript object syntax but is a text format independent of programming languages.

Use the <script> tag to add JavaScript to an HTML file

New properties can be added to JavaScript objects even after the object is created using dot notation or square brackets.

<!DOCTYPE html> us used to declare a document as an HTML file

HTML tags: ( = "<"
Paragraph: (p)
Ordered list: (ol)
Unordered list: (ul)
Second-level heading: (h2)
First-level heading: (h1)
Third-level heading: (h3)

 To display an image with a hyperlink, use the <a> (anchor) tag to create a link and place the <img> tag inside it: <a href="URL"><img src="image.jpg" alt="Description"></a>.

 The CSS rule to change the background color of all <div> elements to red is: div { background-color: red; }.

 The map() method creates a new array by transforming each element in an existing array using a provided function. It's used for iterating through an array and creating a new array based on the function's logic.

 
 
 
 
 ----------
 
 
 
 
 1. Ports for common protocols:

HTTP: 80
HTTPS: 443
SSH: 22

 2. HTTP status codes:

300 range: Redirection (e.g., 301 Moved Permanently, 302 Found)
400 range: Client errors (e.g., 404 Not Found, 401 Unauthorized)
500 range: Server errors (e.g., 500 Internal Server Error, 503 Service Unavailable)

 3. Purpose of the content-type header:

Specifies the format of the data in the request or response body (e.g., text/html, application/json)

 4. Cookie attributes:

Domain: Specifies which domain the cookie is accessible to
Path: Specifies the path on the server where the cookie is accessible
SameSite: Controls how cookies are sent in cross-site requests
HTTPOnly: Prevents client-side JavaScript from accessing the cookie

Domain: Specifies the domain to which the cookie belongs.
Path: Defines the path for which the cookie is valid within the domain.
SameSite: Indicates whether the cookie should be restricted to the same site or cross-site requests.
HTTPOnly: Flags a cookie to be inaccessible via JavaScript for security reasons.

 5. Express middleware output for /foo/bar request:


 6. Return value of JavaScript fetch:

The fetch function returns a Promise representing the response to the request.

 7. Matching MongoDB documents:

Selects all documents where the cost field is greater than 10 and the name field matches the pattern /fran.*/.

 8. Storing user passwords:

Hash passwords using a strong, one-way hashing algorithm (e.g., bcrypt, scrypt) and store only the hashed values in the database.
Never store passwords in plain text.

 9. Websocket console output:

Need the specific Node.js websocket service code to provide an accurate answer.

 10. Purpose of the WebSocket protocol:

Enables full-duplex, bidirectional communication between a client and server over a single TCP connection, often used for real-time applications like chat and live updates. Used for full-duplex communication between client and server over a single, persistent connection.

 11. JSX and curly braces:

JSX is a syntax extension for JavaScript that allows writing HTML-like structures within JavaScript code.
Curly braces within JSX are used to embed JavaScript expressions, evaluating to values that are inserted into the rendered HTML. JSX is a syntax extension that allows mixing HTML-like code within JavaScript. Curly braces {} are used to embed JavaScript expressions in JSX.

 12. Content generated by React component:

      function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
      }
      function App() {
        return (
          <div>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
          </div>
        );
      }
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<App />);

Three <h1> elements: "Hello, Sara", "Hello, Cahal", and "Hello, Edite"
The provided React component renders three <h1> elements, each with a personalized greeting using the given names.

 13.  Content generated by Numbers component:

An unordered list (<ul>) with five list items (<li>), each containing a number from 1 to 5.

 14. Purpose of React component Example:

Manages state for a count variable using the useState hook. It displays the count and increments it on button click.
    Renders a button and a paragraph.
    Tracks the number of times the button is clicked using a state variable called count.
    Updates the paragraph to display the current count.

 15. Purpose of React Hooks:

Allow managing state and side effects within functional React components, without the need for classes. React Hooks are used to introduce state and lifecycle features into functional components.

 16. Purpose of the useEffect hook:

Perform side effects in functional React components, such as data fetching, subscriptions, or manually changing the DOM. useEffect is used for handling side effects in functional components like data fetching or DOM manipulation.

 17. Purpose of the code block:

Defines a React application's routing structure using React Router.
Determines which components are rendered based on the URL path.
Sets up routing with React Router defining routes for /, /blogs, /contact, and fallback to <NoPage /> within a layout.

 18. Role of npm in web development:

Package manager for JavaScript, used to install and manage dependencies in web development projects. npm manages packages, dependencies, and project configurations in web development.

 19. Purpose of package.json:

File that lists a project's dependencies, scripts, and other metadata. It holds metadata about the project, dependencies, and scripts in an npm project.

 20. Purpose of the fetch function:

Makes network requests to fetch resources from a server. fetch makes asynchronous HTTP requests to fetch resources from a network.

 21. Purpose of node.js:

JavaScript runtime environment that allows executing JavaScript code outside of a web browser. Node.js allows running JavaScript code outside a web browser, enabling server-side applications.

 22. Purpose of Vite:

Build tool for frontend web development, focused on speed and developer experience. Vite is a build tool that offers a rapid development server and optimized builds for modern web projects.