SELECT ar.artista AS artista,
    al.album AS album,
    COUNT(se.artista_id) AS seguidores
FROM SpotifyClone.albums AS al
    JOIN SpotifyClone.artistas AS ar ON al.artista_id = ar.artista_id
    JOIN SpotifyClone.seguindo AS se ON se.artista_id = ar.artista_id
GROUP BY artista,
    album
ORDER BY seguidores DESC,
    artista,
    album;