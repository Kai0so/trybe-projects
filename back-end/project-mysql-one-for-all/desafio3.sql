SELECT us.usuario AS usuario,
    COUNT(hi.usuario_id) AS qtde_musicas_ouvidas,
    ROUND(SUM(ca.duracao_segundos) / 60, 2) AS total_minutos
FROM SpotifyClone.usuarios AS us
    JOIN SpotifyClone.historico AS hi ON hi.usuario_id = us.usuario_id
    JOIN SpotifyClone.cancoes AS ca ON ca.cancao_id = hi.cancao_id
GROUP BY us.usuario_id
ORDER BY usuario;