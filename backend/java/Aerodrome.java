import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Aerodrome {

    private String name;
    private String city;
    private String description;
    private Date created_at;
    private Runway[] runways;

    // Constructor
    public Aerodrome() {
    }

    public Aerodrome(
        String name,
        String city,
        String description,
        Date created_at,
        Runway[] runways
    ){
        this.name = name;
        this.city = city;
        this.description = description;
        this.created_at = created_at;
        this.runways = runways;
    }

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public Runway[] getRunways() {
        return runways;
    }

    public void setRunways(Runway[] runways) {
        this.runways = runways;
    }

    // Override do toString()
    @Override
    public String toString() {
        return "Aerodrome{" +
                "name='" + name + '\'' +
                ", city='" + city + '\'' +
                ", description='" + description + '\'' +
                ", created_at=" + created_at +
                ", runways=" + Arrays.toString(runways) +
                '}';
    }

    // Método para retornar as coordenadas corretamente
    public String getCoordinates() {
        String coordinates = "";
        Pattern pattern = Pattern.compile("(([0-9]{6})[N|S]\/([0-9]{7})[E|W])|(([0-9]{6})[\.|\,]([0-9]{2})[N|S]\/([0-9]{7})[\.|\,]([0-9]{2})[E|W])");
        Matcher matcher = pattern.matcher(this.description);
        while (matcher.find()) {
            coordinates = matcher.group(1);
        }
        return coordinates;
    }
}