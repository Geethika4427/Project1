package com.excelr.dto;

public class UserDetailsDto {
    private String username;
    private String email;
    private String phoneNumber;
    private String street;
    private String locality;
    private String city;
    private String state;
    private String country;
    private String postalCode;

    // Constructor
	public UserDetailsDto(String username, String email, String phoneNumber, String street, String locality,
			String city, String state, String country, String postalCode) {
		super();
		this.username = username;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.street = street;
		this.locality = locality;
		this.city = city;
		this.state = state;
		this.country = country;
		this.postalCode = postalCode;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getLocality() {
		return locality;
	}

	public void setLocality(String locality) {
		this.locality = locality;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}



    // Getters and Setters
    
    
}
