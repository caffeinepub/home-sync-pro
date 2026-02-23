import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import Migration "migration";
import MixinAuthorization "authorization/MixinAuthorization";

(with migration = Migration.run)
actor {
  public type ServiceType = {
    #security;
    #climateControl;
    #lighting;
    #entertainment;
    #energyManagement;
    #networking;
  };

  public type ContactInquiry = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    serviceInterest : ServiceType;
    timestamp : Int;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
  };

  let inquiries = Map.empty<Int, ContactInquiry>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Authentication system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Add Contact Inquiry (Anyone can submit, including guests)
  public shared ({ caller }) func submitContactInquiry(name : Text, email : Text, phone : Text, message : Text, serviceInterest : ServiceType) : async () {
    let timestamp = Time.now();
    let inquiry : ContactInquiry = {
      name;
      email;
      phone;
      message;
      serviceInterest;
      timestamp;
    };
    inquiries.add(timestamp, inquiry);
  };

  // Get All Inquiries (Admin only)
  public query ({ caller }) func getAllInquiries() : async [ContactInquiry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view inquiries");
    };
    inquiries.values().toArray();
  };

  // Search Inquiries (Admin only)
  public query ({ caller }) func searchInquiries(searchTerm : Text) : async [ContactInquiry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can search inquiries");
    };

    let filtered = inquiries.values().filter(
      func(inquiry) {
        inquiry.name.contains(#text searchTerm) or
        inquiry.email.contains(#text searchTerm) or
        inquiry.phone.contains(#text searchTerm) or
        inquiry.message.contains(#text searchTerm)
      }
    );
    filtered.toArray();
  };
};
