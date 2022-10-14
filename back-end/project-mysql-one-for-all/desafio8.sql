SELECT ar.artista AS artista,
    al.album AS album
FROM SpotifyClone.albums AS al
    JOIN SpotifyClone.artistas AS ar ON al.artista_id = ar.artista_id
LIMIT 2;