import Time "mo:core/Time";
import Int "mo:core/Int";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

actor {
  type ServiceType = {
    #security;
    #climateControl;
    #lighting;
    #entertainment;
    #energyManagement;
    #networking;
  };

  type ContactSubmission = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    serviceInterest : ServiceType;
    timestamp : Int;
  };

  module ContactSubmission {
    public func compare(sub1 : ContactSubmission, sub2 : ContactSubmission) : Order.Order {
      switch (Int.compare(sub1.timestamp, sub2.timestamp)) {
        case (#equal) { Text.compare(sub1.name, sub2.name) };
        case (order) { order };
      };
    };
  };

  let submissions = Map.empty<Int, ContactSubmission>();

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, phone : Text, message : Text, serviceInterest : ServiceType) : async () {
    let timestamp = Time.now();
    let submission : ContactSubmission = {
      name;
      email;
      phone;
      message;
      serviceInterest;
      timestamp;
    };
    submissions.add(timestamp, submission);
  };

  public query ({ caller }) func getAllSubmissions() : async [ContactSubmission] {
    submissions.values().toArray().sort();
  };
};
