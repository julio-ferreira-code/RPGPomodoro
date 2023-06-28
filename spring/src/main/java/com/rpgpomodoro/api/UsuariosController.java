package com.rpgpomodoro.api;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.rpgpomodoro.domain.Usuario;
import com.rpgpomodoro.domain.UsuarioService;
import com.rpgpomodoro.domain.dto.UsuarioDTO;

@RestController
@RequestMapping("/api/usuarios")
public class UsuariosController {

	@Autowired
	private UsuarioService service;

	@GetMapping()
	@CrossOrigin(origins ="http://localhost:4200")
	public ResponseEntity<?> get() {
		return ResponseEntity.ok(service.getUsuarios());
	}

	@GetMapping("/{id}")
	@CrossOrigin(origins ="http://localhost:4200")
	public ResponseEntity<?> get(@PathVariable("id") Long id) {
		Optional<UsuarioDTO> usuario = service.getUsuarioById(id);

		return usuario.map(ResponseEntity::ok) // uso do conceito de lambda
				.orElse(ResponseEntity.notFound().build());

//		return carro.isPresent() ? // uso do IF ternario
//				ResponseEntity.ok(carro.get()) :
//					ResponseEntity.notFound().build();

//		if(carro.isPresent()) { // uso do IF normal
//			return ResponseEntity.ok(carro.get());
//		}else {
//			return ResponseEntity.notFound().build();
//		}
	}

	@GetMapping("/email/{email}")
	@CrossOrigin(origins ="http://localhost:4200")
	public ResponseEntity<?> get(@PathVariable("email") String email) {
		List<UsuarioDTO> usuarios = service.getUsuariosByEmail(email);

		return usuarios.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(usuarios);
	}

	@PostMapping
	@CrossOrigin(origins ="http://localhost:4200")
	public ResponseEntity<?> post(@RequestBody Usuario usuario) {
		
			UsuarioDTO c = service.insert(usuario);
			
			URI location = getUrl(c.getId());
			return ResponseEntity.created(location).build();
	}
	
	private URI getUrl(Long id) {
		return ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(id).toUri();
	}

	@PutMapping("/{id}")
	@CrossOrigin(origins ="http://localhost:4200")
	public ResponseEntity<?> put(@PathVariable("id") Long id, @RequestBody Usuario usuario) {
		usuario.setId(id);
		UsuarioDTO c = service.update(usuario, id);
		return c != null ?
				ResponseEntity.ok(c):
				ResponseEntity.notFound().build();
	}

	@DeleteMapping("/{id}")
	@CrossOrigin(origins ="http://localhost:4200")
	public ResponseEntity<?> delete(@PathVariable("id") Long id) {
		service.delete(id);
		return ResponseEntity.ok().build();
		
	}

}
