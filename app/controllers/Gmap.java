package controllers;

import models.DocumentEntity;
import models.DocumentService;
import models.Vertex;
import play.mvc.Controller;

import java.util.ArrayList;
import java.util.List;

public class Gmap extends Controller {


    public static void savePolygon(String id, String name, String path) {

        DocumentEntity document = null;


        String[] vertexStrings = path.split(",");
        ArrayList<Vertex> vertices = new ArrayList<Vertex>();

        for(String s : vertexStrings) {
            System.out.println("coords: " + s);
            String[] coords = s.split("\\|");
            System.out.println("lat: " + coords[0] + "  lng: " + coords[1]);
            vertices.add(new Vertex(Double.parseDouble(coords[0]), Double.parseDouble(coords[1])));
        }

        /*
        System.out.println("Params " + params);
        System.out.println(id + ", " + name + ", " + path);
        */

        // See if this polygon already exists.
        try {
            System.out.println("getting document with id " + id);
            document = DocumentService.getDocument(id);
            document.setName(name);
            document.setValue(vertices);
            System.out.println("Document existed and is updated with new values");
        }
        catch(Exception ex) {
            document = new DocumentEntity("polygon", name, vertices);
            System.out.println("Document did not exist or error happened. New object created.");
        }

        document.setId(id);
        DocumentService.UpdateDocument(document);

        System.out.println("Saved polygon with id " + id + " (name " + name + ")");
    }

    public static void getPolygons() {
        List<DocumentEntity> polygons = DocumentService.getDocuments("polygons");
        renderJSON(polygons);
    }

    public static void deletePolygon(String id) {
        DocumentEntity document = DocumentService.getDocument(id);
        if (document != null) {
            DocumentService.deleteDocument(document);
        }
    }
}
