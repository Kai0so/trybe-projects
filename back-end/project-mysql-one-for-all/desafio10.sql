SELECT ca.cancao AS nome,
    COUNT(hi.cancao_id) AS reproducoes
FROM SpotifyClone.cancoes AS ca
    JOIN SpotifyClone.historico AS hi ON ca.cancao_id = hi.cancao_id
    JOIN SpotifyClone.usuarios AS us ON us.usuario_id = hi.usuario_id
WHERE us.plano_id = 1
    OR us.plano_id = 4
GROUP BY nome
ORDER BY nome;