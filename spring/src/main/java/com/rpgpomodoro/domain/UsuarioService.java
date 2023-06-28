package com.rpgpomodoro.domain;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.rpgpomodoro.domain.dto.UsuarioDTO;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository rep;
	
	public List<UsuarioDTO> getUsuarios(){
		
		return rep.findAll().stream().map(c -> UsuarioDTO.create(c) /* UsuarioDTO::new; forma resumida */).collect(Collectors.toList()); // usando lambda
		
//		List<UsuarioDTO> list = new ArrayList<>(); // tradicional usando for
//		for(Usuario c: usuarios) {
//			list.add(new UsuarioDTO(c));
//		}
//		
//		return list;
	}

	public Optional<UsuarioDTO> getUsuarioById(Long id) {
		return rep.findById(id).map(UsuarioDTO::create);
	}
	public List<UsuarioDTO> getUsuariosByEmail(String email) {
		return rep.findByEmail(email).stream().map(UsuarioDTO::create).collect(Collectors.toList()); // usando lambda;
	}
	
	public UsuarioDTO insert(Usuario usuario) {
		Assert.isNull(usuario.getId(),"Não foi possível inserir o registro");
		
		return UsuarioDTO.create(rep.save(usuario));
	}

	public Usuario save(Usuario usuario) {
		return rep.save(usuario);
		
	}

	public UsuarioDTO update(Usuario usuario, Long id) {
		Assert.notNull(id,"Não foi possível atualizar o registro");
		
		//Busca pelo registro no banco de dados
		Optional<Usuario> optional = rep.findById(id);
		if(optional.isPresent()) {
			
			Usuario db = optional.get();
			//Copiar as propriedas
			db.setImagemPet(usuario.getImagemPet());
			db.setLevelPet(usuario.getLevelPet());
			db.setNomePet(usuario.getNomePet());
			db.setPoderPet(usuario.getPoderPet());
			db.setPontosExpPet(usuario.getPontosExpPet());
			db.setRacaPet(usuario.getRacaPet());
			
			rep.save(db);
			return UsuarioDTO.create(db);
		}else {
			return null;
			//throw new RuntimeException("Não foi possível atualizar o registro");
		}
		
	}

	public void delete(Long id) {
		rep.deleteById(id);
	}
	
	
}
