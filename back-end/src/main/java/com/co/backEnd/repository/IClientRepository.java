package com.co.backEnd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.co.backEnd.model.Client;

@Repository
public interface IClientRepository extends JpaRepository<Client, Integer> {
	
	 boolean existsByEmail(String email);
}
