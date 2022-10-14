SELECT COUNT(DISTINCT ca.cancao) AS cancoes,
    COUNT(DISTINCT ar.artista) AS artistas,
    COUNT(DISTINCT al.album) AS albuns
FROM SpotifyClone.albums AS al,
    SpotifyClone.cancoes AS ca,
    SpotifyClone.artistas AS ar;