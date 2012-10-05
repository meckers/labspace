package controllers;

import play.mvc.Controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

public class Application extends Controller {

    public static void index(String area) {
        System.out.println("Application index - area: " + area);
        if (new File("/Users/Magnus/Documents/play-projects/Labspace/app/views/AreaIncludes/" + area).exists()) {
            render(area);
        }
        else
        {
            askToCreate(area);
        }
    }

    public static void askToCreate(String area) {
        System.out.println("Asking to create " + area);
        render(area);
    }

    public static void create(String area) throws IOException {

        System.out.println("Creating folders and files...");

        String templateIncludeDir = "/Users/Magnus/Documents/play-projects/Labspace/app/views/AreaIncludes/" + area;
        String mainTemplate = templateIncludeDir + "/main.html";
        String scriptsFile = templateIncludeDir + "/scripts.files";
        String stylesFile = templateIncludeDir + "/styles.files";
        String publicDir = "/Users/Magnus/Documents/play-projects/Labspace/public/" + area;
        String javascriptDir = publicDir + "/javascripts";
        String stylesheetDir = publicDir + "/stylesheets";
        String defaultScriptFile = javascriptDir + "/default.js";
        String defaultStylesFile = stylesheetDir + "/default.css";

        String[] createDirs = {
                templateIncludeDir,
                publicDir,
                javascriptDir,
                stylesheetDir
        };

        String[] createFiles = {
                mainTemplate,
                scriptsFile,
                stylesFile,
                defaultScriptFile,
                defaultStylesFile
        };

        for(String s : createDirs) {
            System.out.print("Trying to create folder " + s + " ... ");
            boolean success = (new File(s)).mkdir();
            if (success) {
                System.out.print("success!\r\n");
            }
        }

        for(String s : createFiles) {
            System.out.print("Trying to create file " + s + " ... ");
            File f = new File(s);
            boolean success = f.createNewFile();
            if (success) {
                System.out.print("success!\r\n");
            }
        }

        PrintWriter out = new PrintWriter(scriptsFile);
        out.println("default.js");
        out.close();

        out = new PrintWriter(stylesFile);
        out.println("default.css");
        out.close();

        redirect("/" + area);
    }




}