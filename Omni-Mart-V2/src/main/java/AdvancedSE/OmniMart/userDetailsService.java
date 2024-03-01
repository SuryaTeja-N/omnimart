package AdvancedSE.OmniMart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//Used to do things or write business logic on the data received from database using repository or perform
//business logic before updating value into database using repositories. Basically enclosing backend business logic
//here
@Service
public class userDetailsService {
//    @Autowired will tell the framework to instantiate the interface
    @Autowired
    private  userDetailsRepository userDetailsRepository;
    public List<userDetails> allUsers(){
        return userDetailsRepository.findAll();
    }

    public Optional<userDetails> getUser(String email){
        return userDetailsRepository.findUserByemail(email);
    }

    public userDetails addUser(String email, String password){
        return userDetailsRepository.insert(new userDetails(email,password));
    }

}
