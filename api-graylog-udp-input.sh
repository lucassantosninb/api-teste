#!/usr/bin/env bash
#
# usage: ./api-graylog-udp-input.sh "ADMIN_PASSWORD"
#

set -euo pipefail

if [ `curl -s -u admin:$1 -H 'Content-Type: application/json' -X GET 'http://localhost:9000/api/system/inputs' | grep -c 'Standard GELF UDP input'` == 0 ]
then
  curl -u admin:$1 -H 'Content-Type: application/json' -X POST 'http://localhost:9000/api/system/inputs' -d '{
    "title": "Standard GELF UDP input",
    "type": "org.graylog2.inputs.gelf.udp.GELFUDPInput",
    "global": true,
    "configuration":   {
          "recv_buffer_size": 1048576,
          "tcp_keepalive": false,
          "use_null_delimiter": true,
          "number_worker_threads": 2,
          "tls_client_auth_cert_file": "",
          "bind_address": "0.0.0.0",
          "tls_cert_file": "",
          "decompress_size_limit": 8388608,
          "port": 12201,
          "tls_key_file": "",
          "tls_enable": false,
          "tls_key_password": "",
          "max_message_size": 2097152,
          "tls_client_auth": "disabled",
          "override_source": null
        },
    "node": null
  }' -H 'X-Requested-By: cli'
else
  echo "Standard GELF UDP input exists already"
fi