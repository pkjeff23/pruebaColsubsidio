package com.co.backEnd.service.impl;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.co.backEnd.model.Client;
import com.co.backEnd.repository.IClientRepository;
import com.co.backEnd.service.IClientService;


@Service
public class ClientServiceImpl implements IClientService {

	@Autowired
	private IClientRepository clientRepository;
	
	@Override
	public List<Client> findAll() {
		return clientRepository.findAll();
	}

	@Override
	public Client findById(int idClient) {
		return clientRepository.findById(idClient).get();
	}

	@Override
	public Client save(Client client) {	
		if(clientRepository.existsByEmail(client.getEmail())) {
			throw new ResponseStatusException(
			           HttpStatus.BAD_REQUEST, "El correo ya está registrado");
		}
		if(!isEmail(client.getEmail())) {
			throw new ResponseStatusException(
			           HttpStatus.BAD_REQUEST, "No es un correo valido");
		}
		
		if(!isPassword(client.getPassword())) {
			throw new ResponseStatusException(
			           HttpStatus.BAD_REQUEST, "No es una contraseña valida "
			           		+ "Al menos debe contener una mayúscula, una minúscula, un número y un caracter especial. Mínimo 8 caracteres.");
		}
		
		return clientRepository.save(client);
	}

	@Override
	public void deleteById(int idClient) {
		clientRepository.deleteById(idClient);
	}
	
	public Client update(Client client) {
		return clientRepository.save(client);
	}
	

	public boolean isEmail(String correo) {
			
	  Pattern pattern = Pattern.compile("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");			
	  Matcher mather = pattern.matcher(correo);			
	  return mather.find();			
	}
	
	public boolean isPassword(String password) {
		
	  Pattern pattern = Pattern.compile("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$");			
	  Matcher mather = pattern.matcher(password);			
	  return mather.find();				
	}
	
	public boolean existUser(String email) {
		return clientRepository.existsByEmail(email);
	}
}
