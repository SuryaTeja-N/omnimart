package AdvancedSE.OmniMart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

//This is the API
//Router will be used to call the right logic for the right URI of the link
//We can call methods of Services class from here to perform the required actions
//@RestController tells that this class is a REST API class not a general class
//  @RequestMapping annotation tells you can the URI which should be mentioned in URL
//  to hit the class
//	@Getmapping annotation tells that method will be a "GET" end point, we can also add
//path in @Getmapping will get added to the path in RequestMapping

@RestController
@RequestMapping("/userDetails")
public class userDetailsRouter {
    @Autowired
    private userDetailsService userDetailsService;
    @GetMapping("/signIn")
    public ResponseEntity<List<userDetails>> signIn(){
        return new ResponseEntity<List<userDetails>>(userDetailsService.allUsers(),HttpStatus.OK);
    }


    @GetMapping("/getUser/{email}")
//    @PathVariable mentioned below tells framework that we will be passing the info got in path/mapping which is called
//    as path variable into the method.
//    Basically telling whatever we got from path variable {id} should be converted to ObjectId and passed to id
    public ResponseEntity<Optional<userDetails>> getUser(@PathVariable String email){
        return new ResponseEntity<Optional<userDetails>>(userDetailsService.getUser(email),HttpStatus.OK);
    }

    @PostMapping("/signUp")
    public ResponseEntity<userDetails> signUp(@RequestBody Map<String,String> payload){
        return new ResponseEntity<userDetails>(userDetailsService.addUser(payload.get("email"),payload.get("password")),HttpStatus.OK);
    }













}
