package com.example.demoSwagger.service.impl;

import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.example.demoSwagger.service.ITokenService;

@Service
public class TokenServices implements ITokenService {
	public String getJWTToken(String username) {
		String secret = "test";
		String token = "";
		try {
		    Algorithm algorithm = Algorithm.HMAC256(secret);
		     token = JWT.create()
		        .withIssuer("auth0")
		        .sign(algorithm);
		} catch (JWTCreationException exception){
		    // Invalid Signing configuration / Couldn't convert Claims.
		}
		
		return token;
	}	
}
