export const about = `<h2>About</h2><p>This page is a mashup of current Imgur images and related Wikipedia content.</p> <p>Image tags are used to dynamically retreive and display Wikipedia content. Here's how it works:</p>
<ul>
  <li> Imgur GET requests are performed every 30 minutes for the 500 newest viral galleries</li><br />
  <li> Images are filtered for the following conditions:<br />
    <ul>
      <li> No image content </li>
      <li> Multiple images </li>
      <li> No tags </li>
      <li> Tags without a corresponding Wikipedia page (e.g. <a href="https://en.wikipedia.org/wiki/Eatwhatyouwant">#eatwhatyouwant</a>)</li>
    </ul>
    <br>
  <li> Monthly ageview counts for every tag from every image are queried from the Wikimedia API, going back 3 months from the current date. </li><br />
  <li> For each image, only one tag (the tag with the most Wikipedia pageviews) is queried for Wikipedia content. For example, if an imgur user uploads a picture of their cat and tags the photo with #meow, #cute, and #tesla, the wikipedia page for Tesla will most likely be shown.<br />
</ul>`

export const contact = `<h2>Contact</h2><p>This project is coding exercise in React/Redux/Thunk and serves no ads. However, should the fine folks at Imgur object to my use of the word "Imgur" in the URL, I totally get it. No cease and desist letter is necessary, please email me at wikimgur at geemail dawt com and I will promptly comply with the takedown request. In exchange however, I expect @Lassannn to be immediately stripped of his moderator duties. Please note that mails sent to the above email address NOT originating from imgur.com will be programatically filtered, scoffed at, or quite possibly both.</p>`;

export const style = `<h2>Style</h2><p>This site isn't pretty. Attempts to preserve the "Wikipedia look" in the Wikipedia pane whilst styling other panes/components with modern css and polished React components yielded suboptimal (hideous) results. Accordingly, the current styling choice was a conscious decision to use Wikipedia stylesheets for most content - a decision made with a <a href="https://envato.com/blog/brutalism-ugly-web-design-trend-taking-internet/"><b><i>brutalist</i></b></a> approach.</p>`
