# ISHub + Client
League of Legends Item Set Hub - Create and Share League Item Sets


The Item Sets Hub is a place for summoners to create and share their item sets for their favorite champions. Along with a web page for sharing and voting, there is a tool (tentatively called) fISH Client that can be downloaded to ease the extraction and installment of item sets. The client is NOT necessary to use the Hub, instructions for manually placing item sets will be included on the web page.

Project Roadmap
---------------
### v0.1.0
#### Hub
Users should be able to login to the Hub and create Item Sets; which should have permalinks so that others may find and download them.
#### Client
Users should be able to download standard League Item Set .json files and install them in few clicks. As well as be able to export their current Item Sets to the Hub

### v0.2.0
#### Hub
Users should be able to vote on favorite Item Sets and search Item Sets by Popularity or Votes.
#### Client
Users should be able to create Item Sets directly in the Client with out having to go to the HUB. As well as sign into their Hub account and save Item Sets directly to the Hub.

Download Client
-------------

There are currently no released binaries of fISH Client available for download.
You may however download the project source and create a build by yourself with the steps below.

Building Warp
-------------

To build Warp for your platform from the latest project source, you need to have `nodeJS` and `npm` installed on your machine.

You will need to have the grunt cli tool installed to run grunt, install that with:

    npm install -g grunt-cli
    
When you have downloaded the source, move into the root of the project and run the following command:

    npm install 

This will install the grunt dependencies needed to build the app. Run this command now:

    grunt

This will create a folder `builds/fISH Client/` with a more folders for different platforms inside. Within each folder is the executable for the repective platform named fISH Client.
    
```
fISH Client
├───linux32
│   │   fISH Client <----- Run This
│   │   icudtl.dat
│   │   libffmpegsumo.so
│   │    nw.pak
│   │
│   └───locales
│
├───linux64
│   │   fISH Client <----- Run This
│   │   icudtl.dat
│   │   libffmpegsumo.so
│   │   nw.pak
│   │
│   └───locales
│
├───win32
│   │   d3dcompiler_47.dll
│   │   ffmpegsumo.dll
│   │   fISH Client.exe <----- Run This
│   │   icudtl.dat
│   │   libEGL.dll
│   │   libGLESv2.dll
│   │   nw.pak
│   │   pdf.dll
│   │
│   └───locales
│
└───win64
    │   d3dcompiler_47.dll
    │   ffmpegsumo.dll
    │   fISH Client.exe <----- Run This
    │   icudtl.dat
    │   libEGL.dll
    │   libGLESv2.dll
    │   nw.pak
    │   pdf.dll
    │
    └───locales
```

Now, you can simply click file to run the application. :sunglasses: