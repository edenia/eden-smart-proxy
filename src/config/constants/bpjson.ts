const bpJson = [
  {
    producer_account_name: 'sentnlagents',
    org: {
      candidate_name: 'Sentnl',
      website: 'https://www.sentnl.io',
      code_of_conduct:
        'https://medium.com/@charles.holtzkampf/wax-code-of-conduct-c135050c49a4',
      ownership_disclosure:
        'https://medium.com/@charles.holtzkampf/wax-code-of-conduct-c135050c49a4#2dd3',
      email: 'charles@sentnl.io',
      branding: {
        logo_256: 'https://www.sentnl.io/sentnl_256.png',
        logo_1024: 'https://www.sentnl.io/sentnl_1024.png',
        logo_svg: 'https://www.sentnl.io/sentnl.svg'
      },
      location: {
        name: 'London',
        country: 'GB',
        latitude: 51.51118829,
        longitude: -0.09617353
      },
      social: {
        steemit: '',
        twitter: 'sentnl_io',
        facebook: '',
        github: 'ankh2054',
        reddit: '',
        keybase: 'ankh2054',
        telegram: 'ankh2054'
      }
    },
    nodes: [
      {
        location: {
          name: 'United Kingdom',
          country: 'GB',
          latitude: 51.51118829,
          longitude: -0.09617353
        },
        node_type: 'full',
        api_endpoint: 'http://eosapi.sentnl.io:8080',
        ssl_endpoint: 'https://eosapi.sentnl.io:4343'
      },
      {
        location: {
          name: 'United Kingdom',
          country: 'GB',
          latitude: 51.51118829,
          longitude: -0.09617353
        },
        node_type: 'seed',
        p2p_endpoint: 'eosp2p.sentnl.io:4242'
      },
      {
        location: {
          name: 'United Kingdom',
          country: 'GB',
          latitude: 51.5099,
          longitude: -0.1181
        },
        node_type: 'producer'
      }
    ]
  },
  {
    producer_account_name: 'heliosblocks',
    org: {
      candidate_name: 'heliosblocks',
      website: 'https://eos.heliosrising.com',
      ownership_disclosure: 'https://www.heliosrising.com/helios-bp',
      code_of_conduct: 'https://www.heliosrising.com/helios-bp',
      email: 'info@heliosrises.com',
      branding: {
        logo_256: 'https://eos.heliosrising.com/helios-logo_256.png',
        logo_1024: 'https://eos.heliosrising.com/helios-logo_1024.png',
        logo_svg: 'https://eos.heliosrising.com/helios-logo.svg'
      },
      location: {
        name: 'Puerto Rico',
        country: 'US',
        latitude: 18.4655,
        longitude: 66.1057
      },
      social: {
        twitter: 'helios_rising_',
        facebook: 'Helios-108890411605127',
        discord: 'eUwgSsQfTx',
        telegram: 'helios_rising'
      }
    },
    nodes: [
      {
        location: {
          name: 'Puerto Rico',
          country: 'US',
          latitude: 18.4655,
          longitude: 66.1057
        },
        node_type: 'query',
        features: ['chain-api', 'account-query'],
        api_endpoint: 'http://api.eos.heliosrising.com',
        ssl_endpoint: 'https://api.eos.heliosrising.com'
      },
      {
        location: {
          name: 'Puerto Rico',
          country: 'US',
          latitude: 45.425532,
          longitude: -75.700269
        },
        node_type: 'producer'
      },
      {
        location: {
          name: 'Puerto Rico',
          country: 'US',
          latitude: 18.4655,
          longitude: 66.1057
        },
        node_type: 'seed',
        p2p_endpoint: 'api.eos.heliosrising.com:9876'
      }
    ]
  },
  {
    producer_account_name: 'eosbarcelona',
    producer_public_key:
      'EOS8WEaLDWnnBbRdYdefHzqumi1Jx3NEquk7wdTkEQyfa3iJXGxqN',
    org: {
      candidate_name: 'eosBarcelona',
      website: 'https://eos.barcelona',
      ownership_disclosure:
        'https://steemit.com/eos/@jrosich/introducing-eosbarcelona',
      code_of_conduct:
        'https://steemit.com/eos/@jrosich/introducing-eosbarcelona',
      email: 'contact@eos.barcelona',
      github_user: 'jrosich',
      branding: {
        logo_256: 'https://eos.barcelona/eosLogo-256.png',
        logo_1024: 'https://eos.barcelona/eosLogo-256.png',
        logo_svg: ''
      },
      location: {
        name: 'Barcelona',
        country: 'ES',
        latitude: 41.3667,
        longitude: 2.0667
      },
      social: {
        steemit: 'jrosich',
        twitter: 'eosbarcelona',
        youtube: '',
        facebook: '',
        github: 'jrosich',
        reddit: 'eosbarcelona',
        keybase: 'eosbarcelona',
        telegram: 'eosbarcelona',
        wechat: ''
      }
    },
    nodes: [
      {
        location: {
          name: 'Germany',
          country: 'DE',
          latitude: 52.520008,
          longitude: 13.404954
        },
        node_type: 'producer'
      },
      {
        location: {
          name: 'Germany',
          country: 'DE',
          latitude: 52.520008,
          longitude: 13.404954
        },
        node_type: ['query', 'seed'],
        p2p_endpoint: 'p2p.eos.barcelona:2093',
        api_endpoint: 'http://api.eos.barcelona',
        ssl_endpoint: 'https://api.eos.barcelona',
        features: ['chain-api']
      }
    ]
  },
  {
    producer_account_name: 'eos42freedom',
    org: {
      candidate_name: 'EOS42',
      website: 'https://eos42.io',
      code_of_conduct:
        'https://steemit.com/eos/@eos42/eos42-statement-of-ownership-and-code-of-conduct-v1-0',
      ownership_disclosure:
        'https://steemit.com/eos/@eos42/eos42-statement-of-ownership',
      email: 'community@eos42.io',
      github_user: 'PhillipHamnett',
      branding: {
        logo_256: 'https://eos42.io/static/img/eos42_logo_bp2.png',
        logo_1024: 'https://eos42.io/static/img/eos42_logo_bp_1024_2.png',
        logo_svg: 'https://eos42.io/static/img/eos42_logo_bp2.svg'
      },
      location: {
        name: 'Germany',
        country: 'DE',
        latitude: 50.1109,
        longitude: 8.6821
      },
      social: {
        steemit: 'eos42',
        twitter: 'EOS42io',
        github: 'eos42',
        keybase: 'phamnett',
        telegram: 'EOS42'
      }
    },
    nodes: [
      {
        location: {
          name: 'Frankfurt',
          country: 'DE',
          latitude: 50.1109,
          longitude: 8.6821
        },
        node_type: 'producer'
      },
      {
        location: {
          name: 'Frankfurt',
          country: 'DE',
          latitude: 50.1109,
          longitude: 8.6821
        },
        node_type: 'query',
        features: ['chain-api', 'account-query'],
        ssl_endpoint: 'https://api.eos42.io'
      },
      {
        location: {
          name: 'Frankfurt',
          country: 'DE',
          latitude: 50.1109,
          longitude: 8.6821
        },
        node_type: 'seed',
        p2p_endpoint: 'p2p.eos42.io:9876'
      }
    ]
  },
  {
    producer_account_name: 'bountyblokbp',
    org: {
      candidate_name: 'bountyblok.io',
      website: 'https://www.bountyblok.io',
      code_of_conduct: 'https://www.bountyblok.io/coc.html',
      ownership_disclosure: 'https://www.bountyblok.io/ownership.html',
      email: 'dimitri@bountyblok.io',
      github_user: ['diminiko'],
      branding: {
        logo_256: 'https://www.bountyblok.io/img/logo_256x256.png',
        logo_1024: 'https://www.bountyblok.io/img/logo_1024x1024.png',
        logo_svg: 'https://www.bountyblok.io/img/logo_128x128.svg'
      },
      location: {
        name: 'Montreal',
        country: 'CA',
        latitude: 45.495921,
        longitude: -73.757817
      },
      social: {
        medium: 'bountyblok',
        twitter: 'bountyblok',
        github: 'bountyblok',
        keybase: 'bountyblokio',
        telegram: 'bountyblok'
      }
    },
    nodes: [
      {
        location: {
          name: 'UnitedStates',
          country: 'US',
          latitude: 45.495921,
          longitude: -73.757817
        },
        api_endpoint: 'http://api.wax.bountyblok.io',
        ssl_endpoint: 'https://api.wax.bountyblok.io',
        node_type: 'query',
        features: ['chain-api']
      },
      {
        location: {
          name: 'UnitedStates',
          country: 'US',
          latitude: 45.495921,
          longitude: -73.757817
        },
        p2p_endpoint: 'p2p.wax.bountyblok.io:29876',
        node_type: 'seed'
      },
      {
        location: {
          name: 'Poland',
          country: 'PL',
          latitude: 45.495921,
          longitude: -73.757817
        },
        p2p_endpoint: '',
        api_endpoint: '',
        ssl_endpoint: '',
        node_type: 'producer'
      },
      {
        location: {
          name: 'Canada',
          country: 'CA',
          latitude: 45.495921,
          longitude: -73.757817
        },
        ssl_endpoint: 'https://api.wax-aa.bountyblok.io',
        node_type: 'query',
        features: ['atomic-assets-api']
      }
    ]
  },
  {
    producer_account_name: 'caleosblocks',
    org: {
      candidate_name: 'CALEOS',
      website: 'https://caleos.io',
      code_of_conduct: 'https://caleos.io#conduct',
      ownership_disclosure: 'https://caleos.io#team',
      email: 'info@caleos.io',
      branding: {
        logo_256: 'https://caleos.io/images/caleos_black.png',
        logo_1024: 'https://caleos.io/images/caleos_black_lg.png',
        caleos_white_png: 'https://caleos.io/images/caleos_white.png',
        logo_svg: 'https://caleos.io/images/caleos_black.svg',
        caleos_white_svg: 'https://caleos.io/images/caleos_white.svg'
      },
      location: {
        name: 'California',
        country: 'US',
        latitude: 36.972323,
        longitude: -122.024017
      },
      social: {
        twitter: 'caleosio',
        medium: 'caleosio',
        github: 'CALEOS',
        telegram: 'CalEOS',
        steemit: 'caleosio'
      }
    },
    nodes: [
      {
        location: {
          name: 'San Jose',
          country: 'US',
          latitude: 37.334174,
          longitude: -121.891759
        },
        node_type: 'producer'
      },
      {
        location: {
          name: 'San Jose',
          country: 'US',
          latitude: 37.334174,
          longitude: -121.891759
        },
        node_type: 'seed',
        p2p_endpoint: 'eos.caleos.io:9881'
      },
      {
        location: {
          name: 'San Jose',
          country: 'US',
          latitude: 37.334174,
          longitude: -121.891759
        },
        node_type: 'query',
        api_endpoint: 'http://eos.caleos.io',
        ssl_endpoint: 'https://eos.caleos.io',
        features: ['chain-api']
      }
    ]
  },
  {
    producer_account_name: 'argentinaeos',
    org: {
      candidate_name: 'EOSArgentina',
      website: 'https://www.eosargentina.io',
      code_of_conduct:
        'https://www.eosargentina.io/disclosures.html#codeofconduct',
      ownership_disclosure:
        'https://www.eosargentina.io/disclosures.html#disclosures',
      email: 'info@eosargentina.io',
      branding: {
        logo_256: 'https://www.eosargentina.io/assets/img/eosar_logo_256.png',
        logo_1024: 'https://www.eosargentina.io/assets/img/eosar_logo_1024.png',
        logo_svg: 'https://www.eosargentina.io/assets/img/eosar_logo.svg'
      },
      location: {
        name: 'BuenosAires',
        country: 'AR',
        latitude: -34.61315,
        longitude: -58.37723
      },
      social: {
        steemit: 'eosargentina',
        twitter: 'eosargentina',
        facebook: 'EOSArgentina',
        github: 'eosargentina',
        reddit: 'eosargentina',
        keybase: 'eosargentina',
        telegram: 'eosarg',
        wechat: 'wxid_3r2tf35z69fk22'
      }
    },
    nodes: [
      {
        location: {
          name: 'Germany',
          country: 'DE',
          latitude: 52.52,
          longitude: 13.405
        },
        node_type: 'producer'
      },
      {
        location: {
          name: 'eosargentina',
          country: 'AR',
          latitude: -34.61315,
          longitude: -58.37723
        },
        node_type: 'full',
        api_endpoint: 'http://api.eosargentina.io',
        ssl_endpoint: 'https://api.eosargentina.io',
        history_type: 'none'
      },
      {
        location: {
          name: 'eosargentina',
          country: 'AR',
          latitude: -34.61315,
          longitude: -58.37723
        },
        node_type: 'seed',
        p2p_endpoint: 'p2p.eosargentina.io:5222'
      }
    ]
  },
  {
    producer_account_name: 'bp.boid',
    org: {
      candidate_name: 'boid.com',
      website: 'https://eos.boid.com',
      code_of_conduct: 'https://eos.boid.com/code.html',
      ownership_disclosure: 'https://eos.boid.com/ownership.html',
      email: 'eos@boid.com',
      branding: {
        logo_256: 'https://eos.boid.com/BoidLogo-256.png',
        logo_1024: 'https://eos.boid.com/BoidLogo-lg.png',
        logo_svg: 'https://eos.boid.com/boidlogo.svg'
      },
      location: {
        name: 'Tenerife, Canary Islands, Spain',
        country: 'ES',
        latitude: 28.467319,
        longitude: -16.247113
      },
      social: {
        steemit: 'boidcom',
        twitter: 'boidcom',
        youtube: 'channel/UCL4I3DksM41qPKih2PbiQ7g',
        facebook: 'boidcom',
        github: 'boid-com',
        reddit: 'boidcom',
        keybase: 'boidcom',
        telegram: 'Boidcom_official',
        wechat: ''
      }
    },
    nodes: [
      {
        location: {
          name: 'Tenerife, Canary Islands, Spain',
          country: 'ES',
          latitude: 28.467319,
          longitude: -16.247113
        },
        node_type: 'producer',
        p2p_endpoint: '',
        api_endpoint: '',
        ssl_endpoint: ''
      },
      {
        location: {
          name: 'Tenerife, Canary Islands, Spain',
          country: 'ES',
          latitude: 28.467319,
          longitude: -16.247113
        },
        node_type: 'query',
        p2p_endpoint: '',
        api_endpoint: '',
        ssl_endpoint: 'https://eos.api.boid.animus.is',
        features: ['chain-api']
      }
    ]
  },
  {
    producer_account_name: 'bppgl.mlt',
    org: {
      candidate_name: 'EOS BP PGL.MLT',
      website: 'https://eospglmlt.com',
      code_of_conduct: 'https://www.eospglmlt.com/code-of-conduct.html',
      ownership_disclosure:
        'https://www.eospglmlt.com/ownership-disclosure.html',
      email: 'eosquestion@gmail.com',
      github_user: 'EOSTezoEMP',
      chain_resources: '',
      other_resources: [],
      branding: {
        logo_256:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAApAAAACICAYAAABQr9uPAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAB7pSURBVHgB7d1tcBz3fR/w73/vABCUWIK2pBmlymihF67HfUFStvsweaEFR3LjVhOBnlH8ojMmqM44ddOIoFo/KC+MhWZaKQ8jgerUbdoZ45RXjl9Y0LR+VnjL6TRxYscEM5nYiSfCKrIjxXrAUXzAAXe3//x/uD3pBALE7t3u3t7t9+NZHUwewANwt/fd3//hBxARERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERHR0FAg2oPWWm6mwsPu+ng3ftdtTSlVAxHlVvj6nkPCzGu/goLJ888yfGyz2PvcnRTfPF4PORB+z7Y5HFDP9nv+MUDSNvOCk5PLMXMcDW/lsNH7SUcCpB8el8yxKod5QvogooEzr3k5/wdIlrxzP2Ze50soiDCsnDbHl5EsbX6OFvoU/p7PI/0wtWwe7yPIgRR/J0Wy7/OvjP2+gtZz5uY+5N9ltEOL8PFuJWwVdIOuwChXpg+hHRaT1Pn6nX+j8+/6aIfJFXNcyEOgDE82C0j+Z9DNM9/rcygY19Woef7UwbGJUyarHNPKPO90hIsShZr5tbwM3Vx56sVpDzQsJKx80bymKgUahdj+nkFUMPsGSLSvWk5hSIXhQAKLbw7PHJfyUmbPWhgaHXOcQTvYpT2ksRs7PGbDx3TR3JzDYMOkvAE4SPcKXZ6IhQqQCw//HI0/+tncZLn8jEar/VzTET9Zh8Mjqnzm8QdeWdOl8omnvnWnjz5p7eI5rzZVrx+YKpW1vft9gtrYWMM/PbPEaRi9OWKOp82Ri2pUmtK++JRzNqcDUV7tO4QtV5IY4gB5E545KshJFSxN5nfooB3Y5Pc4iNAYlWeOStaVuoyGeHIzvJOFhQd/hq2t1kkzCPI1JGNto9G8d8mb7unN9KvVBbzZuD5XsuTiSR2L9lnaa2m9+JkHftfDCEppCPudL2+OE6N8sR6Gx2lzvIR0yD9wT7/vTxzCph7tO4Td9/yKIeagHSDX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',
        logo_1024: 'https://eospglmlt.com/bp-logo-1024.png',
        logo_svg: 'https://eospglmlt.com/bp-logo.svg'
      },
      location: {
        name: 'Los Angeles, California',
        country: 'US',
        latitude: 34.231972,
        longitude: -118.403785
      },
      social: {
        keybase: '',
        telegram: 'MrEOSMicroLoan',
        twitter: 'EOSPGLMLT_BP',
        github: 'EOSTezoEMP',
        youtube: '',
        facebook: '',
        hive: '',
        reddit: '',
        wechat: ''
      }
    },
    nodes: [
      {
        location: {
          name: 'Miami, Floria',
          country: 'US',
          latitude: 25.791717,
          longitude: -80.332282
        },
        node_type: 'producer'
      },
      {
        location: {
          name: 'Miami, Floria',
          country: 'US',
          latitude: 25.791717,
          longitude: -80.332282
        },
        node_type: 'seed',
        p2p_endpoint: 'p2p.eosmarketplace.io:9876'
      },
      {
        location: {
          name: 'Miami, Floria',
          country: 'US',
          latitude: 25.791717,
          longitude: -80.332282
        },
        node_type: 'query',
        api_endpoint: 'http://api.eosmarketplace.io',
        ssl_endpoint: 'https://api.eosmarketplace.io',
        features: ['chain_api']
      }
    ]
  },
  {
    org: {
      candidate_name: 'EOS Costa Rica',
      website: 'https://eoscostarica.io',
      code_of_conduct: 'https://edenia.com/block-producer/#code-of-conduct',
      ownership_disclosure:
        'https://edenia.com/block-producer/#ownership-disclosure',
      email: 'bp@edenia.com',
      github_user: [
        'edgarithm',
        'xavier506',
        'murillojorge',
        'tetogomez',
        'kuronosec',
        'leisterfrancisco',
        'AngeloCG97'
      ],
      chain_resources: 'https://archive.edenia.cloud',
      other_resources: [
        'https://mainnet.eosio.online',
        'https://eosrate.io',
        'https://guide.eoscostarica.io',
        'https://guias.eoscostarica.io',
        'https://evodex.io',
        'https://github.com/eoscostarica/eos-local'
      ],
      branding: {
        logo_256: 'https://eoscostarica.io/img/eoscr-logo-256.png',
        logo_1024: 'https://eoscostarica.io/img/eoscr-logo-1024.png',
        logo_svg: 'https://eoscostarica.io/img/eoscr-logo.svg'
      },
      location: {
        name: 'San Jose',
        country: 'CR',
        latitude: 9.936377,
        longitude: -84.078155
      },
      social: {
        keybase: 'eoscostarica',
        telegram: 'eoscr',
        twitter: 'EOSCostaRica',
        github: 'eoscostarica',
        youtube: 'channel/UCvYinCH3O1iKpi-_dNfQAGQ',
        facebook: 'costaricaeos',
        hive: 'eos-costarica',
        reddit: 'eoscostarica',
        wechat: ''
      }
    },
    nodes: [
      {
        location: {
          name: 'San Jose',
          country: 'CR',
          latitude: 9.936377,
          longitude: -84.078155
        },
        node_type: 'query',
        ssl_endpoint: 'https://eos.edenia.cloud',
        features: ['chain-api', 'account-query']
      },
      {
        location: {
          name: 'San Jose',
          country: 'CR',
          latitude: 9.936377,
          longitude: -84.078155
        },
        node_type: 'seed',
        p2p_endpoint: 'eos.edenia.cloud:9876'
      },
      {
        location: {
          name: 'San Jose',
          country: 'CR',
          latitude: -84.078155,
          longitude: 9.936377
        },
        node_type: 'producer'
      }
    ],
    producer_account_name: 'costaricaeos'
  },
  {
    producer_account_name: 'cryptolions1',
    org: {
      candidate_name: 'CryptoLions🦁',
      website: 'https://cryptolions.io',
      code_of_conduct: 'https://cryptolions.io/code-of-conduct',
      ownership_disclosure: 'https://cryptolions.io/ownership-disclosure',
      email: 'roar@cryptolions.io',
      github_user: 'ansigroup',
      chain_resources: '',
      other_resources: [
        'https://eosnetworkmonitor.io',
        'https://eos.tools.simpleassets.io',
        'https://eos.certs.cryptolions.io',
        'https://eos.kolobok.io',
        'https://eos.simplemarket.io',
        'https://simpleassets.io',
        'https://redemptionbank.io'
      ],
      branding: {
        logo_256: 'https://imgs.cryptolions.io/logo_256.png',
        logo_1024: 'https://imgs.cryptolions.io/logo_1024.png',
        logo_svg: 'https://imgs.cryptolions.io/logo.svg'
      },
      location: {
        name: 'Ukraine',
        country: 'UA',
        latitude: 49.8397,
        longitude: 24.0297
      },
      social: {
        keybase: 'cryptolions',
        telegram: 'CryptoLions_io',
        twitter: 'EOS_CryptoLions',
        github: 'CryptoLions',
        youtube: 'channel/UCB7F-KO0mmZ1yVBCq0_1gtA',
        facebook: '',
        hive: '',
        reddit: '',
        wechat: ''
      }
    },
    nodes: [
      {
        location: {
          name: 'Germany-Finland',
          country: 'DE',
          latitude: 51.2993,
          longitude: 9.491
        },
        node_type: 'producer'
      },
      {
        location: {
          name: 'Germany-Finland',
          country: 'FI',
          latitude: 60.3419912,
          longitude: 25.0292574
        },
        node_type: 'producer'
      },
      {
        location: {
          name: 'Germany-Finland',
          country: 'DE',
          latitude: 51.2993,
          longitude: 51.2993
        },
        node_type: ['query', 'seed'],
        p2p_endpoint: 'p2p.eos.cryptolions.io:9876',
        api_endpoint: 'http://api.eos.cryptolions.io',
        ssl_endpoint: 'https://api.eos.cryptolions.io',
        features: ['chain-api', 'account-query']
      }
    ]
  },
  {
    producer_account_name: 'donates2eden',
    org: {
      candidate_name: 'Donates2Eden',
      website: 'https://donates2eden.io',
      code_of_conduct: 'https://en.wikipedia.org/wiki/Golden_Rule',
      ownership_disclosure: 'https://www.agenix.io',
      email: 'domenic@agenix.io',
      branding: {
        logo_256: 'https://donates2eden.io/images/logo_256.png',
        logo_1024: 'https://donates2eden.io/images/logo_1024.png',
        logo_svg: 'https://donates2eden.io/images/logo.svg'
      },
      location: {
        name: 'Los Angeles, CA',
        country: 'US',
        latitude: 34.0731,
        longitude: -117.8807
      },
      social: {
        steemit: '',
        twitter: 'gilesmanly',
        youtube: '',
        facebook: '',
        github: '',
        reddit: '',
        keybase: '',
        telegram: 'DomenicT',
        wechat: ''
      }
    },
    nodes: [
      {
        location: {
          name: 'Dallas, TX',
          country: 'US',
          latitude: 32.779167,
          longitude: -96.808891
        },
        node_type: 'seed',
        p2p_endpoint: 'p2p.donates2eden.io:9876'
      },
      {
        location: {
          name: 'Los Angeles, CA',
          country: 'US',
          latitude: 34.0731,
          longitude: -117.8807
        },
        node_type: 'producer'
      }
    ]
  },
  {
    producer_account_name: 'eosamsterdam',
    org: {
      candidate_name: 'EOSAmsterdam',
      website: 'https://eosamsterdam.net',
      code_of_conduct:
        'https://steemit.com/eos/@eosamsterdam/eos-amsterdam-code-of-conduct',
      ownership_disclosure: 'https://eosamsterdam.net#partners',
      email: 'contact@eosamsterdam.net',
      github_user: ['cc32d9'],
      branding: {
        logo_256: 'https://eosamsterdam.net/branding/logo_256.png',
        logo_1024: 'https://eosamsterdam.net/branding/logo_1024.png',
        logo_svg: 'https://eosamsterdam.net/branding/logo_svg.svg'
      },
      location: {
        name: 'Amsterdam',
        country: 'NL',
        latitude: 52.3548445,
        longitude: 4.9600367
      },
      social: {
        steemit: 'eosamsterdam',
        twitter: 'eosamsterdam',
        facebook: 'EOS-Amsterdam-1586544661442120',
        github: 'eosamsterdam',
        reddit: 'eosamsterdam',
        telegram: 'EOS_Amsterdam',
        wechat: 'eosamsterdam'
      }
    },
    nodes: [
      {
        location: {
          name: 'Amsterdam',
          country: 'NL',
          latitude: 52.354925,
          longitude: 4.96096
        },
        node_type: 'producer'
      },
      {
        location: {
          name: 'eos01',
          country: 'DE',
          latitude: 49.00921,
          longitude: 8.403951
        },
        node_type: 'seed',
        p2p_endpoint: 'mainnet.eosamsterdam.net:9876'
      },
      {
        location: {
          name: 'eos01',
          country: 'DE',
          latitude: 49.00921,
          longitude: 8.403951
        },
        node_type: 'query',
        features: ['chain-api', 'account-query'],
        api_endpoint: 'http://mainnet.eosamsterdam.net',
        ssl_endpoint: 'https://mainnet.eosamsterdam.net'
      }
    ]
  },
  {
    producer_account_name: 'eosauthority',
    org: {
      candidate_name: 'EOS Authority',
      website: 'https://eosauthority.com',
      email: 'hello@eosauthority.com',
      github_user: 'eosauthority',
      branding: {
        logo_256:
          'https://res.cloudinary.com/dwkobzcjz/image/fetch/w_50,h_50,c_fill,r_5/https://eosauthority.com/common/bp-standard-info/EOS-AUTHORITY-256.jpg',
        logo_1024:
          'https://eosauthority.com/common/bp-standard-info/EOS-AUTHORITY-1024.jpg',
        logo_svg:
          'https://eosauthority.com/common/bp-standard-info/eosauthority.svg'
      },
      location: {
        name: 'London',
        country: 'GB',
        latitude: 51.512838,
        longitude: -0.087177
      },
      social: {
        steemit: 'eosauthority',
        twitter: 'eosauthority',
        youtube: 'eosauthority',
        facebook: '',
        github: 'eosauthority',
        reddit: 'eosauthority',
        keybase: 'eosauthority',
        telegram: 'eosauthority',
        wechat: 'eosauthority'
      }
    },
    nodes: [
      {
        location: {
          name: 'London',
          country: 'GB',
          latitude: 51.512838,
          longitude: -0.087177
        },
        node_type: 'query',
        api_endpoint: 'http://publicapi-mainnet.eosauthority.com',
        ssl_endpoint: 'https://publicapi-mainnet.eosauthority.com',
        features: ['chain-api']
      },
      {
        location: {
          name: 'London',
          country: 'GB',
          latitude: 51.512838,
          longitude: -0.087177
        },
        node_type: 'seed',
        p2p_endpoint: 'node869-mainnet.eosauthority.com:9393'
      },
      {
        location: {
          name: 'London',
          country: 'GB',
          latitude: 51.512838,
          longitude: -0.087177
        },
        node_type: 'producer'
      }
    ]
  },
  {
    producer_account_name: 'eosdublinwow',
    org: {
      candidate_name: 'eosDublin',
      website: 'https://www.eosdublin.com',
      code_of_conduct: 'https://www.eosdublin.com/values/',
      ownership_disclosure: 'https://www.eosdublin.com/disclosures/#ownership',
      email: 'hello@eosdublin.com',
      branding: {
        logo_256:
          'https://raw.githubusercontent.com/eosdublin/eosdublin/master/images/eosdublin-icon-256.png',
        logo_1024:
          'https://raw.githubusercontent.com/eosdublin/eosdublin/master/images/eosdublin-icon-1024.png',
        logo_svg:
          'https://cdn.rawgit.com/eosdublin/eosdublin/master/images/icon.svg'
      },
      location: {
        name: 'Dublin',
        country: 'IE',
        latitude: 53.3498,
        longitude: -6.2603
      },
      social: {
        steemit: 'eosdublin',
        twitter: 'eosdublin',
        github: 'eosdublin',
        reddit: 'EOSDublin',
        keybase: 'eosdublin',
        telegram: 'eosdublin'
      }
    },
    nodes: [
      {
        location: {
          name: 'Dublin',
          country: 'IE',
          latitude: 53.3498,
          longitude: -6.2603
        },
        node_type: 'producer'
      },
      {
        location: {
          name: 'Dublin',
          country: 'IE',
          latitude: 53.3498,
          longitude: -6.2603
        },
        node_type: 'full',
        api_endpoint: 'http://api.eosdublin.io',
        ssl_endpoint: 'https://api.eosdublin.io'
      },
      {
        location: {
          name: 'Dublin',
          country: 'IE',
          latitude: 53.3498,
          longitude: -6.2603
        },
        node_type: 'seed',
        p2p_endpoint: 'eos-seed.eosdublin.io:9876'
      }
    ]
  },
  {
    org: {
      email: 'eos-gcp-bp@google.com',
      branding: {
        logo_1024:
          'https://storage.googleapis.com/eosgcpbpacct/logos/logo_cloud_1024px.png',
        logo_256:
          'https://storage.googleapis.com/eosgcpbpacct/logos/logo_cloud_256px.png',
        logo_svg:
          'https://storage.googleapis.com/eosgcpbpacct/logos/logo_cloud.svg'
      },
      location: {
        latitude: 37.3861,
        name: 'Mountain View, CA',
        longitude: -122.0839,
        country: 'US'
      },
      candidate_name: 'GCPBP',
      website: 'https://dlt.withgoogle.com/eos',
      github_user: 'GoogleCloudPlatform',
      social: {
        github: 'GoogleCloudPlatform',
        twitter: 'googlecloud',
        youtube: 'googlecloudplatform'
      }
    },
    producer_account_name: 'eosgcpbpacct',
    nodes: [
      {
        node_type: 'producer',
        location: {
          latitude: 37.3861,
          name: 'us-central',
          longitude: -122.0839,
          country: 'US'
        }
      },
      {
        p2p_endpoint: '34.96.75.100:8099',
        location: {
          country: 'US',
          longitude: -122.0839,
          name: 'us-central',
          latitude: 37.3861
        },
        node_type: 'seed'
      },
      {
        api_endpoint: 'http://35.244.141.211',
        features: ['chain-api'],
        node_type: 'query',
        location: {
          name: 'us-central',
          longitude: -122.0839,
          country: 'US',
          latitude: 37.3861
        }
      }
    ]
  },
  {
    producer_account_name: 'eosiodetroit',
    org: {
      candidate_name: 'Detroit Ledger Technologies',
      website: 'https://detroitledger.tech',
      ownership_disclosure:
        'https://detroitledger.tech/block-producer/transparency',
      code_of_conduct:
        'https://steemit.com/eos/@eos.detroit/eos-detroit-membership-guidelines',
      email: 'ask@detroitledger.tech',
      github_user: ['wakeupjohnny', 'LuqWright'],
      chain_resources: '',
      other_resources: [],
      branding: {
        logo_256:
          'https://detroitledger.tech/images/logos/EOSD_logo_transparent_256.png',
        logo_1024:
          'https://detroitledger.tech/images/logos/EOSD_logo_transparent.png',
        logo_svg: 'https://detroitledger.tech/images/logos/EOSD_logo.svg'
      },
      location: {
        name: 'DETROIT',
        country: 'US',
        latitude: 42.3314,
        longitude: -83.0458
      },
      social: {
        steemit: 'eos.detroit',
        twitter: 'detledgertech',
        youtube: 'detroitledgertechnologies',
        facebook: 'detroitledgertech',
        github: 'eosdetroit',
        reddit: 'eosdetroit',
        keybase: 'wakeupjohnny',
        telegram: 'detroitledgertech',
        wechat: 'robrigo_eosdetroit'
      }
    },
    nodes: [
      {
        location: {
          name: 'eos-api1-dlt',
          country: 'US',
          latitude: 39.9612,
          longitude: -82.9988
        },
        node_type: 'query',
        p2p_endpoint: '',
        api_endpoint: '',
        ssl_endpoint: 'https://api.eos.detroitledger.tech',
        features: ['chain-api', 'account-query', 'history-v1']
      },
      {
        location: {
          name: 'eos-seed-dlt',
          country: 'US',
          latitude: 39.9612,
          longitude: -82.9988
        },
        node_type: 'seed',
        p2p_endpoint: 'p2p.eos.detroitledger.tech:1337',
        api_endpoint: '',
        ssl_endpoint: ''
      },
      {
        location: {
          name: 'eos-bp-dlt',
          country: 'US',
          latitude: 42.3314,
          longitude: -83.0458
        },
        node_type: 'producer',
        p2p_endpoint: '',
        api_endpoint: '',
        ssl_endpoint: ''
      }
    ]
  },
  {
    producer_account_name: 'eosnodeonebp',
    org: {
      candidate_name: 'NodeONE☝️',
      website: 'https://www.nodeone.io',
      code_of_conduct:
        'https://steemit.com/eos/@eosnodeone/eos-nodeone-roadmap-and-stance-on-vote-buying',
      ownership_disclosure:
        'https://steemit.com/nodeone/@eosnodeone/eosnodeone-ownership-disclosure',
      email: 'contact@eosnodeone.io',
      github_user: 'hahnryu',
      branding: {
        logo_256:
          'https://www.nodeone.io/resources/images/eosnodeone_logo_256.png',
        logo_1024:
          'https://www.nodeone.io/resources/images/eosnodeone_logo_1024.png',
        logo_svg: 'https://www.nodeone.io/resources/images/eosnodeone_logo.svg'
      },
      location: {
        name: 'Seoul',
        country: 'KR',
        latitude: 37.5326,
        longitude: 127.024612
      },
      social: {
        steemit: 'eosnodeone',
        twitter: 'eosnodeone',
        github: 'nodeoneio',
        keybase: 'hahn_eosnodeone',
        telegram: 'nodeone_group'
      }
    },
    nodes: [
      {
        location: {
          name: 'Seoul',
          country: 'KR',
          latitude: 37.5326,
          longitude: 127.024612
        },
        node_type: ['seed', 'producer'],
        p2p_endpoint: 'peer-eos.nodeone.network:9871',
        api_endpoint: '',
        ssl_endpoint: ''
      },
      {
        location: {
          name: 'Seoul',
          country: 'KR',
          latitude: 37.5326,
          longitude: 127.024612
        },
        node_type: 'query',
        api_endpoint: 'http://api-eos.nodeone.network:8888',
        ssl_endpoint: 'https://api-eos.nodeone.network:8344',
        features: ['chain-api', 'account-query']
      },
      {
        location: {
          name: 'Falkenstein',
          country: 'DE',
          latitude: 50.47887,
          longitude: 12.33496
        },
        node_type: 'query',
        api_endpoint: 'http://api1-eos.nodeone.network:8888',
        ssl_endpoint: 'https://api1-eos.nodeone.network:8344',
        features: ['chain-api', 'account-query']
      }
    ]
  },
  {
    producer_account_name: 'eosphereiobp',
    org: {
      candidate_name: 'EOSphere',
      website: 'https://www.eosphere.io',
      code_of_conduct: 'https://www.eosphere.io/code-of-conduct',
      ownership_disclosure: 'https://www.eosphere.io/ownership',
      email: 'info@eosphere.io',
      github_user: 'rossco99',
      chain_resources: 'https://snapshots.eosphere.io',
      branding: {
        logo_256: 'https://www.eosphere.io/eospherelogosquare256.png',
        logo_1024: 'https://www.eosphere.io/eospherelogosquare1024.png',
        logo_svg: 'https://www.eosphere.io/eospherelogosquare.svg'
      },
      location: {
        name: 'Australia',
        country: 'AU',
        latitude: -31.953512,
        longitude: 115.857048
      },
      social: {
        steemit: 'eosphere',
        twitter: 'eosphere_io',
        youtube: 'eosphere',
        facebook: 'eosphereio',
        github: 'eosphere',
        reddit: 'eosphere',
        keybase: 'eosphere',
        telegram: 'eosphere_io',
        wechat: 'ross-eosphere'
      }
    },
    nodes: [
      {
        location: {
          name: 'Sydney',
          country: 'AU',
          latitude: -31.953512,
          longitude: 115.857048
        },
        node_type: 'producer'
      },
      {
        location: {
          name: 'Beauharnois',
          country: 'CA',
          latitude: 45.3151,
          longitude: 73.8779
        },
        node_type: 'seed',
        full: true,
        p2p_endpoint: 'peer1.eosphere.io:9876'
      },
      {
        location: {
          name: 'Sydney',
          country: 'AU',
          latitude: -31.953512,
          longitude: 115.857048
        },
        node_type: 'query',
        full: true,
        api_endpoint: 'http://eos.eosphere.io',
        ssl_endpoint: 'https://eos.eosphere.io',
        features: ['chain-api', 'account-query']
      }
    ]
  },
  {
    producer_account_name: 'eosriobrazil',
    org: {
      candidate_name: 'EOS Rio 💙 ',
      website: 'https://eosrio.io',
      code_of_conduct: 'https://eosrio.io/code-of-conduct/',
      ownership_disclosure: 'https://eosrio.io/ownership-disclosure/',
      email: 'contact@eosrio.io',
      github_user: 'igorls',
      branding: {
        logo_256:
          'https://eosrio.io/wp-content/uploads/2018/06/logo-eosrio-square-bgblack-1.jpg',
        logo_1024: 'https://eosrio.io/logo-eosrio1024.png',
        logo_svg: 'https://eosrio.io/logo-eosrio-black-square-01.svg'
      },
      location: {
        name: 'Rio de Janeiro',
        country: 'BR',
        latitude: -22.9068,
        longitude: -43.1729
      },
      social: {
        steemit: 'eosrio',
        twitter: 'eosriobrazil',
        youtube: 'channel/UC5aslySB2QP_v8dyMMBcTxw',
        facebook: 'EOSRioBP',
        github: 'eosrio',
        reddit: 'eosrio',
        keybase: 'igorls',
        telegram: 'eosrio',
        wechat: 'eosrio'
      }
    },
    nodes: [
      {
        location: {
          name: 'Rio de Janeiro',
          country: 'BR',
          latitude: -23.9068,
          longitude: -46.1729
        },
        node_type: 'query',
        api_endpoint: 'http://api.eosrio.io',
        ssl_endpoint: 'https://api.eosrio.io',
        features: ['chain-api']
      },
      {
        location: {
          name: 'Rio de Janeiro',
          country: 'BR',
          latitude: -23.9068,
          longitude: -46.1729
        },
        node_type: 'query',
        api_endpoint: 'http://eos.hyperion.eosrio.io',
        ssl_endpoint: 'https://eos.hyperion.eosrio.io',
        features: ['chain-api', 'account-query', 'history-v1', 'hyperion-v2']
      },
      {
        location: {
          name: 'Rio de Janeiro',
          country: 'BR',
          latitude: -22.9096,
          longitude: -43.1729
        },
        node_type: 'seed',
        p2p_endpoint: 'p2p.mainnet.eosrio.io:9876'
      },
      {
        location: {
          name: 'Rio de Janeiro',
          country: 'BR',
          latitude: -22.9096,
          longitude: -43.1729
        },
        node_type: 'producer'
      }
    ]
  },
  {
    producer_account_name: 'eosswedenorg',
    org: {
      candidate_name: 'Sw/eden🌿',
      website: 'https://eossweden.org',
      code_of_conduct: 'https://eossweden.org/code-of-conduct/',
      ownership_disclosure: 'https://eossweden.org/code-of-conduct/#Ownership',
      chain_resources: 'https://snapshots.eossweden.org',
      email: 'community@eossweden.org',
      github_user: ['xebb82', 'coachbjork', 'pnx'],
      branding: {
        logo_256: 'https://eossweden.org/logo/logo-256.png',
        logo_1024: 'https://eossweden.org/logo/logo-1024.png',
        logo_svg: 'https://eossweden.org/logo/sw-eden-teal.svg'
      },
      location: {
        name: 'Sweden',
        country: 'SE',
        latitude: 59.6268,
        longitude: 16.544
      },
      social: {
        steemit: 'eossweden',
        twitter: 'eossweden',
        youtube: 'channel/UCtU6EBVLcDMGFpUXpPbXKkw',
        facebook: 'EOS-sweden-554084258304426',
        github: 'eosswedenorg',
        reddit: 'eossweden',
        keybase: 'xebb',
        telegram: 'eossweden',
        wechat: 'xebb82'
      }
    },
    nodes: [
      {
        location: {
          name: 'Sweden',
          country: 'SE',
          latitude: 59.3322,
          longitude: 18.0707
        },
        node_type: 'producer'
      },
      {
        location: {
          name: 'Sweden',
          country: 'SE',
          latitude: 59.6268,
          longitude: 16.544
        },
        node_type: 'seed',
        p2p_endpoint: 'p2p.eossweden.org:9876'
      },
      {
        location: {
          name: 'Sweden',
          country: 'SE',
          latitude: 59.3322,
          longitude: 18.0707
        },
        node_type: 'query',
        api_endpoint: 'http://api.eossweden.org',
        ssl_endpoint: 'https://api.eossweden.org',
        features: ['chain-api', 'history-v1', 'hyperion-v2']
      }
    ]
  }
]

export default { bpJson }
