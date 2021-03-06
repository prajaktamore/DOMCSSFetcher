
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv="X-UA-Compatible" content="chrome=1">
<meta name="description" content="DOMCSSFetcher : ">
<link rel="stylesheet" type="text/css" media="screen" href="stylesheets/stylesheet.css">
<title>DOMCSSFetcher</title>
</head>
<body>
<!-- HEADER -->
<div id="header_wrap" class="outer">
<header class="inner">
<a id="forkme_banner" href="https://github.com/prajaktamore/DOMCSSFetcher">View on GitHub</a>
<h1 id="project_title">DOMCSSFetcher</h1>
<h2 id="project_tagline"></h2>
<section id="downloads">
<a class="zip_download_link" href="https://github.com/prajaktamore/DOMCSSFetcher/zipball/master">Download this project as a .zip file</a>
<a class="tar_download_link" href="https://github.com/prajaktamore/DOMCSSFetcher/tarball/master">Download this project as a tar.gz file</a>
</section>
</header>
</div>
<!-- MAIN CONTENT -->
<div id="main_content_wrap" class="outer">
<section id="main_content" class="inner">
<h3>
<a name="welcome-to-github-pages" class="anchor" href="#welcome-to-github-pages"><span class="octicon octicon-link"></span></a>Welcome to DOMCSSFetcher.</h3>
<p>A configurable web GUI tool to help users generate/understand DOM element selectors. See the Tool Bookmark(You have to Bookmark the Link on Sample page to Use it for your site) and Sample Example(This is Just a Sample to see if CSS Selectors are populated) page click here: <h2><a href="http://prajaktamore.github.io/DOMCSSFetcher/DOMCSSFetcher/">DOMCSSFetcher Tool</a></h2></p>
<p>Developers refer CSS Selector to check the element and retrieve it easily while Tester writes test cases based on CSS Selectors as it is accurate. We use firebug extension firefinder to locate elements using CSS selectors. The existing SuperSelector tool selects only one element at a time. But the new enhancement DOMCSSFetcher will help to retrieve all elements within a specific elements. This will help testers to directly retrieve elements at once time in a specific div or form or other group element. Also have added a extension to customize the elements with specific tag are excluded according to user requirement. That is if user don't need br, td, tr then he can exclude it.</p>
<h3><br>
<a name="designer-templates" class="anchor" href="#designer-templates"><span class="octicon octicon-link"></span></a>Why to Use this tool</h3>
<p>
<br>Goals : <br>
	1. To help on quickly find list of element CSS Selectors within a element before we start testing.<br>
	2. To give an optimized CSS Selector list for page elements that uniquely define each element.<br>
	3. To generate list of which could be used in automation in selenium.<br>
</p>
<p>
<br>Current Gaps : <br>
	1. It is difficult to get unique CSS locators for each element.<br>
	2. If Developer make any changes to code base, QE cannot find it easily and have a generate check manually to generate changes locator.<br>
	3. Developer and QE both need to check what exactly changes they made in a specific page.<br>
	4. Existing tools only return 1 element at a time.<br>
	5. No option to ignore any tag types. <br>
</p>
<p>
<br>Resolution : <br>
	1. Generate CSS locators list for specific page area.<br>
	2. Fetch all the list of the CSS Selectors in the page and display in output.<br>
	3. Also Added ignore of TAGS which user dowsn't want. like br, td etc.<br>
</p>
<h3><br>
<a name="rather-drive-stick" class="anchor" href="#rather-drive-stick"><span class="octicon octicon-link"></span></a>Use?</h3>
<p><br>
	1.	Click on the Above link "here" and drag it to your bookmark.<br>
	2.	Now you will see the bookmark as "DOMCSSFetcher" in your bookmark list.<br>
	3.	Open any webpage you want to see the selectors e.g "http://stackoverflow.com/"<br>
	4.	Now goto Bookmarks and click the "DOMCSSFetcher", You will see the small UI tool will open in your browser.<br>
	5. 	Configuration in tabs for classes, ID's and Tags you will see. Please Follow the configuration as mentioned in tool examples. <br>
	6. 	You can ignore configuration if not required.<br>
	7.	You can "ctrl" + click the element to see the list of elements within it.<br>
	8.  You can directly use these Selectors if want to test any block of page in Selenium or other frameowrks that support CSS Selectors.<br>
</p>
</p>
</p>
</p>
<h3><br>
<a name="Limitation" class="anchor" href="#Limitation"><span class="octicon octicon-link"></span></a>Limitation?</h3>
<p><br>
	1.	https:// Pages support is not working due to browser security setting.<br>
	2.	Retrieves only CSS Selectors and don't support xpath etc.<br>
</p>
<h3>
<a name="authors-and-contributors" class="anchor" href="#authors-and-contributors"><span class="octicon octicon-link"></span></a>Authors and Contributors</h3>
<p>You can <a href="https://github.com/prajaktamore?tab=repositories" class="user-mention">@prajaktamore</a> The reference was taken from 2012 Priyank Vyas MIT Lincence Caplin SuperSelector to with permission to deal
in the Software without restriction from GitHub.</p>
<h3>
<a name="support-or-contact" class="anchor" href="#support-or-contact"><span class="octicon octicon-link"></span></a>Support or Contact</h3>
<p>Having trouble with tool? Check out the documentation at <a href="https://prajaktamore.github.io/DOMCSSFetcher/">https://prajaktamore.github.io/DOMCSSFetcher/</a> or contact <a href="mailto:pmore2@binghamton.edu">pmore2@binghamton.edu</a> and we’ll help you sort it out.</p>
</section>
</div>
<!-- FOOTER -->
<div id="footer_wrap" class="outer">
<footer class="inner">
<p class="copyright">Domcssfetcher maintained by <a href="https://github.com/prajaktamore?tab=repositories">prajaktamore</a></p>
<p>Published with <a href="http://pages.github.com">GitHub Pages</a></p>
</footer>
</div>
</body>
</html>
