const bpJson = [
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
        logo_256: 'https://eospglmlt.com/bp-logo-256.png',
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
          'https://eosauthority.com/common/bp-standard-info/EOS-AUTHORITY-256.jpg',
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
      candidate_name: 'EOS Detroit',
      website: 'https://eosdetroit.io',
      ownership_disclosure: 'https://eosdetroit.io/block-producer/transparency',
      code_of_conduct:
        'https://steemit.com/eos/@eos.detroit/eos-detroit-membership-guidelines',
      email: 'ask@eosdetroit.io',
      branding: {
        logo_256: 'https://eosdetroit.io/images/eos-detroit_256.png',
        logo_1024: 'https://eosdetroit.io/images/eos-detroit_1024.png',
        logo_svg: 'https://eosdetroit.io/images/eos-detroit.svg'
      },
      location: {
        name: 'Detroit',
        country: 'US',
        latitude: 42.3314,
        longitude: -83.0458
      },
      social: {
        steemit: 'eos.detroit',
        twitter: 'eosiodetroit',
        youtube: 'eosdetroit',
        facebook: 'eosiodetroit',
        github: 'eosdetroit',
        reddit: 'eosdetroit',
        keybase: 'robrigo',
        telegram: 'eos_detroit',
        wechat: 'robrigo_eosdetroit'
      }
    },
    nodes: [
      {
        location: {
          name: 'EOS Detroit API 1',
          country: 'US',
          latitude: 39.9612,
          longitude: -82.9988
        },
        node_type: 'full',
        p2p_endpoint: '',
        api_endpoint: '',
        ssl_endpoint: 'https://api.eosdetroit.io'
      },
      {
        location: {
          name: 'EOS Detroit Seed 1',
          country: 'US',
          latitude: 39.9612,
          longitude: -82.9988
        },
        node_type: 'seed',
        p2p_endpoint: 'p2p.eosdetroit.io:3018',
        api_endpoint: '',
        ssl_endpoint: ''
      },
      {
        location: {
          name: 'EOS Detroit BP 1',
          country: 'US',
          latitude: 39.9612,
          longitude: -82.9988
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
