package com.co.backEnd.service;

import java.util.List;

import com.co.backEnd.model.Client;

public interface IClientService {
	 List<Client> findAll();
	 Client findById(int idClient);
	 Client save(Client client);
	 void deleteById(int idClient);
	 Client update(Client client);
	 boolean existUser(String email);
}
