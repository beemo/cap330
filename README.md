<h2>Read Me</h2><p>This page is a mashup of current Imgur images and related Wikipedia content.</p> <p>Image tags are used to dynamically retreive and display Wikipedia content. Here's how it works:</p>
<ul>
  <li> Imgur GET requests are performed every 6 minutes </li>
  <li> Images are filtered for the following conditions:
    <ul>
      <li> No image content </li>
      <li> Multiple images </li>
      <li> No tags </li>
      <li> Tags without corresponding Wikipedia content (#eatwhatyouwant)</li>
      <li> Tags linking to Wikipedia <a href="https://en.wikipedia.org/wiki/Help:Disambiguation">disambiguation</a> pages</li>
    </ul>
    <br>
  <li> Pageview counts for every tag from every image are queried from the Wikimedia API </li>
  <li> For each image, only the tag with the most Wikipedia pageviews is queried for Wikipedia content</li>
</ul>
