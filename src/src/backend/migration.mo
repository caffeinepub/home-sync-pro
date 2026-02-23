import Map "mo:core/Map";
import Int "mo:core/Int";
import Text "mo:core/Text";

module {
  type OldActor = {
    submissions : Map.Map<Int, {
      name : Text;
      email : Text;
      phone : Text;
      message : Text;
      serviceInterest : {
        #security;
        #climateControl;
        #lighting;
        #entertainment;
        #energyManagement;
        #networking;
      };
      timestamp : Int;
    }>;
  };

  type NewActor = {
    inquiries : Map.Map<Int, {
      name : Text;
      email : Text;
      phone : Text;
      message : Text;
      serviceInterest : {
        #security;
        #climateControl;
        #lighting;
        #entertainment;
        #energyManagement;
        #networking;
      };
      timestamp : Int;
    }>;
  };

  public func run(old : OldActor) : NewActor {
    let newInquiries = old.submissions.map<Int, {
      name : Text;
      email : Text;
      phone : Text;
      message : Text;
      serviceInterest : {
        #security;
        #climateControl;
        #lighting;
        #entertainment;
        #energyManagement;
        #networking;
      };
      timestamp : Int;
    }, {
      name : Text;
      email : Text;
      phone : Text;
      message : Text;
      serviceInterest : {
        #security;
        #climateControl;
        #lighting;
        #entertainment;
        #energyManagement;
        #networking;
      };
      timestamp : Int;
    }>(
      func(_key, submission) {
        {
          name = submission.name;
          email = submission.email;
          phone = submission.phone;
          message = submission.message;
          serviceInterest = submission.serviceInterest;
          timestamp = submission.timestamp;
        };
      }
    );
    { inquiries = newInquiries };
  };
};
