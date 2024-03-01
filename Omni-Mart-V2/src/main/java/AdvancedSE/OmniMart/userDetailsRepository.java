package AdvancedSE.OmniMart;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

//Repositories contain the methods that directly interact with the database
//Repositories are always Interfaces, used to modify the CRUD operations if needed.
//MongoRepository will already have all the methods like findALl and others to connect with database
//We can extend those functionalities using repository

//@Repository tells framework that this is a repository
@Repository
public interface userDetailsRepository extends MongoRepository<userDetails, ObjectId> {
//    There is something called automatic queries which lets us build queries from property names
//    Just by using our property name in below method name, springboot understands that we are trying to
//    get data using the email property of document
    Optional<userDetails> findUserByemail(String email);
}
