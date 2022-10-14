SELECT us.usuario AS usuario,
    IF(
        MAX(YEAR(hi.data_reproducao)) >= 2021,
        'Usuário ativo',
        'Usuário inativo'
    ) AS condicao_usuario
FROM SpotifyClone.usuarios AS us
    JOIN SpotifyClone.historico AS hi ON hi.usuario_id = us.usuario_id
GROUP BY hi.usuario_id
ORDER BY usuario;