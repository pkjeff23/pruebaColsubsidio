package com.co.backEnd.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.co.backEnd.model.Client;
import com.co.backEnd.service.IClientService;
import com.co.backEnd.service.ITokenService;

@RestController
@RequestMapping("/client")
@CrossOrigin(origins = "*", methods = { RequestMethod.HEAD , RequestMethod.GET ,RequestMethod.PUT, RequestMethod.POST, RequestMethod.DELETE})
public class ClientController {

	@Autowired
	private IClientService clientService;
	
	@Autowired
	private ITokenService tokenservice;
	
	@GetMapping
	public List<Client> listAll() {
		return clientService.findAll();
	}

	@GetMapping("/{idClient}")
	public Client listById(@PathVariable int idClient) {
		return clientService.findById(idClient);
	}

	@PutMapping("/{idClient}")
	public ResponseEntity<?> update(@PathVariable int idClient, @RequestBody Client client) {
		Client clientSave = clientService.update(client);
		return ResponseEntity.ok(clientSave);
	}

	@PostMapping
	public ResponseEntity<?> register(@RequestBody Client client) {
		try {
			client.setToken(tokenservice.getJWTToken(client.getName()));
			client.setCreated(LocalDateTime.now());
			client.setActive(true);
			client.setLastLogin(LocalDateTime.now());
			client.setModified(LocalDateTime.now());
			Client clientSave = clientService.save(client);
			return ResponseEntity.ok(clientSave);
			
		} catch (ResponseStatusException e) {
			return ResponseEntity.status(e.getStatus()).body(e.getMessage());
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno");
		}
	}

	@DeleteMapping("/{idClient}")
	public ResponseEntity<?> deleteById(@PathVariable int idClient) {
		clientService.deleteById(idClient);
		return ResponseEntity.ok(null);
	}
	
	@GetMapping("/authenticate/{email}")
	public ResponseEntity<?> listById(@PathVariable String email) {
		boolean existEmail = clientService.existUser(email);
		return ResponseEntity.ok(existEmail);
	}
}
