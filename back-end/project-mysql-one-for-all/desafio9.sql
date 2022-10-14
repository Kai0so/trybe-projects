SELECT COUNT(hi.usuario_id) AS quantidade_musicas_no_historico
FROM SpotifyClone.historico AS hi
    JOIN SpotifyClone.usuarios AS us ON hi.usuario_id = us.usuario_id
WHERE us.usuario = 'Bill';