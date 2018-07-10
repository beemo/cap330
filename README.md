<h2>Wikimgur</h2>
<h3><a href="http://wikimgur.com">wikimgur.com</a></h3>

<img src="http://bensky.io/img/portfolio/carousel/wikimgur.jpg" alt="screenshot #1 of bbq-journal.com" width="80%" >

<p><strong>wikimgur.com is a mashup of current Imgur images and related Wikipedia content.</p></strong>
<p>Image tags are used to dynamically retreive and display Wikipedia content.</p>
<p>Here's how it works:</p>
<ul>
  <li> Imgur GET requests are performed every 6 minutes </li>
  <li> Images are filtered for the following conditions:</li>
    <ul>
      <br>
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
<br><h3>Technologies used:</h3>
<ul>
      <li> React </li>
      <li> Redux </li>
      <li> redux-thunk </li> 
</ul>

This repo only contains frontend files for wikimgur.com. Here is the repo containing the (completely separate) [backend](https://github.com/benskyio/wikimgur-backend).
