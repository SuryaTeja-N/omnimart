package AdvancedSE.OmniMart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//This is the main application

@SpringBootApplication
//@EnableAutoConfiguration(exclude = {MongoAutoConfiguration.class, MongoDataAutoConfiguration.class})
public class OmniMartApplication {

    public static void main(String[] args) {
        SpringApplication.run(OmniMartApplication.class, args);
    }


}
