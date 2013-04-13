Symfony Demo using AngularJS
============================

This is the standard Symfony demo that appears after configuring a standard symfony2 application. This has been modified to use Symfony2 twig templates but Angular Captures those, compiles it using a directive and displays the page. This was done so that an existing Symfony application can be converted to use AngularJS rather than go the complete server-client route where the server just returns JSON data. This demo makes the server return Twig templates as any standrad Symfony2 application will do.

Application uses:
* Symfony2
* AngularJS 1.0.5
* UI Router

Apache Configuration:
You can configure Apache using the apache.conf in the parent directory.

Pending items:
* Figure out if duplicating entries in app.js (which are basically entries in routing*.yml) can be avoided
* Splitting out angular routes into multiple files (to demonstrate modularity)
* Show Symfony profiler
