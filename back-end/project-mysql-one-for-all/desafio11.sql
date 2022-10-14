SELECT ca.cancao AS nome_musica,
    CASE
        WHEN ca.cancao LIKE '%Streets' THEN REPLACE(ca.cancao, 'Streets', 'Code Review')
        WHEN ca.cancao LIKE '%Her Own' THEN REPLACE(ca.cancao, 'Her Own', 'Trybe')
        WHEN ca.cancao LIKE '%Inner fire' THEN REPLACE(ca.cancao, 'Inner Fire', 'Project')
        WHEN ca.cancao LIKE '%Silly' THEN REPLACE(ca.cancao, 'Silly', 'Nice')
        WHEN ca.cancao LIKE '%Circus' THEN REPLACE(ca.cancao, 'Circus', 'Pull Request')
        else ca.cancao
    END AS novo_nome
FROM SpotifyClone.cancoes AS ca
WHERE ca.cancao IN (
        'Dance With Her Own',
        'Magic Circus',
        'Troubles Of My Inner Fire',
        'Without My Streets',
        "Let's Be Silly"
    )
ORDER BY ca.cancao;