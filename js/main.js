$(document).ready(function(){

	var select = $("<select id ='select_first'></select>");
	select.addClass("form-control");
	$("#contenido").append(select);

	select_first = $("#select_first");
	select_first.append("<option value='0'>Escoja una opción<i class='fas fa-chevron-down'></i></option");
	select_first.append("<option value='1'>Datos Básicos</option>");
	select_first.append("<option value='2'>Datos Favoritos</option>");

	select_first.change(function(){
		val = $("#select_first").val();
		recibiendo_json(val);
	});

});

function recibiendo_json(opcion){
	console.log(opcion);

	switch(opcion){
		case '1':

			$.getJSON('datos.json', function(resultado){
				console.log(resultado);
				//generando resultado básico
				if($("#listado_basico")){
					$("#listado_basico").remove();
				}
				if($("#listado_favoritos")){
					$("#listado_favoritos").remove();
				}

				form_basico = $("<table id='listado_basico'></table>");
				form_basico.addClass("table");
				form_basico.css({"margin":"5px"});
				$("#contenido").append(form_basico);

				cont = resultado[0].DatosPersonales.length
				tr = "<tr>";
				trf = "</tr>";
				td = "<td>";
				tdf = "</td>";
				b = "<b>";
				bf = "</b>";

				$("#listado_basico").append(tr+td+b+"Nombre"+bf+tdf+td+b+"Apellido"+bf+tdf+td+b+"Edad"+bf+tdf+td+b+"Peso"+bf+tdf+trf);				

				for(i = 0; i < cont; i++){

					$("#listado_basico").append(td+resultado[0].DatosPersonales[i]+tdf);
				}
			});

		break;

		case '2':

			$.ajax({
				url: 'datos.json',
				type: 'GET',
				success: function(resultado){
					//generando resultado básico
					if($("#listado_favoritos")){
						$("#listado_favoritos").remove();
					}
					if($("#listado_basico")){
					$("#listado_basico").remove();
				}

					form_full = $("<table id='listado_favoritos'></table>");
					form_full.addClass("table");
					form_full.css({"margin":"5px"});
					$("#contenido").append(form_full);

					cont = resultado[0].Favoritos.length;

					tr = "<tr>";
					trf = "</tr>";
					td = "<td>";
					tdf = "</td>";
					b = "<b>";
					bf = "</b>";

					list_fav = $("#listado_favoritos");

					list_fav.append(tr+td+b+"Favorito 1"+bf+tdf+td+b+"Favorito 2"+bf+tdf+td+b+"Favorito 3"+bf+tdf+td+b+"Favorito 4"+bf+tdf+trf);

					for(i = 0; i < cont; i++){
						list_fav.append(td+resultado[0].Favoritos[i]+tdf);
					}
				},
				error: function(resultado){
				}
			});

		break;
	}
}