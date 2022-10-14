SELECT ca.cancao AS cancao,
    COUNT(hi.cancao_id) AS reproducoes
FROM SpotifyClone.cancoes AS ca
    JOIN SpotifyClone.historico AS hi ON ca.cancao_id = hi.cancao_id
GROUP BY cancao
ORDER BY reproducoes DESC,
    cancao
LIMIT 2;