// https://pokeapi.co/api/v2/pokemon/ url de primeros 20
// "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20" URL para los siguientes 20

$(document).ready(function(){
    function requestApi(pokemon) {
        fetch(pokemon)
        .then(response => response.json())
        .then(function(data){
            var n = 1
            respuesta = data
            console.log(respuesta)
            data.results.forEach(function(info){
                let details = `<div class='container col-md-4 pokemon'>
                <div class="card mb-5 mt-5 pt-5 pb-5" style="width: 18rem;">
                    <div class="card-body">
                        <h1 class="card-title">${info.name}</h1>
                        <a id='enlace-${n}' href="#" url="${info.url}" class="btn btn-primary pokemodal">¡Quiero ver más de este pokémon!</a>
                    </div>
                </div>
                </div>`
                $('#info').append(details);
                n = n + 1;
                })
                next_url = data.next
                back_url = data.previous
                if (back_url == null){
                    $('#btn_back').hide()
                } else {
                    $('#btn_back').show()
                }
                let nextAdress = `<a id='pokeparagraph' href="${data.next}">Ver los otros pokemones</a>`
                $('#next-button').append(nextAdress)
                console.log(nextAdress)

                $('.pokemodal').click(function(e){
                    e.preventDefault();
                    let new_url = ($(this).attr('url'));

                    fetch(new_url)
                        .then(response => response.json())
                        .then(function(data){
                                $('.erase-before-send').empty()
                                var pokeImage = data.sprites.front_default
                                var pokeImageBack = data.sprites.back_default
                                $("#pokeImage").attr("src", pokeImage);
                                $("#pokeImageBack").attr("src", pokeImageBack);
                                $('#url-pokemon-modal').html((data.species.name.charAt(0).toUpperCase() + data.species.name.substr(1).toLowerCase()));
                                data.abilities.forEach(function(abi){ 
                                $("#abilityPokemon").append("<p class='list-ability'>"+abi.ability.name.charAt(0).toUpperCase()+abi.ability.name.substr(1).toLowerCase()+"</p>")
                                });
                                data.types.forEach(function(tipo){
                                $("#typePokemon").append("<p>"+tipo.type.name.charAt(0).toUpperCase()+tipo.type.name.substr(1).toLowerCase()+"</p>")
                                });
                                data.moves.forEach(function(move, index){
                                if (index < 5) {
                                    $("#movePokemon").append("<p>"+move.move.name.charAt(0).toUpperCase()+move.move.name.substr(1).toLowerCase()+"</p>")
                                }
                                });
                                data.game_indices.forEach(function(index){
                                $("#generationPokemon").append("<p>"+index.version.name.charAt(0).toUpperCase()+index.version.name.substr(1).toLowerCase()+"</p>")
                                });
                            }
                    );
                    $('#myModal').modal('show');
                });
            });
    }
    var back_url
    var next_url
    requestApi('https://pokeapi.co/api/v2/pokemon/');

    function activeButton (){
        $('#btn').click(function(){
            $('#info').empty('.pokemon')
            $('#pokeparagraph').remove()
            requestApi(next_url)
        });
        $('#btn_back').click(function(){
            $('#info').empty('.pokemon')
            $('#pokeparagraph').remove()
            requestApi(back_url)
        });
    };
    activeButton()
});