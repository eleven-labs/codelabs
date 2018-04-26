### Ajout d'un proxy REST et d'une doc Swagger

Nous allons maintenant voir comment exposer un service gPRC comme une api REST.
Puisqu' un serveur gRPC n'est pas disponible pour le web, l'une des solutions est de créer une autre service qui va exposer une route REST et appeller le service gRPC.

[grpc-gateway](https://github.com/grpc-ecosystem/grpc-gateway) est un plugin protoc pour auto-générer un proxy HTTP via de la conf dans le fichier protobuf.
```
    HTTP request
        |
        v
 --------------                   ---------------
|  HTTP Proxy  |   json/proto    |  gRPC Server  |
|   on :8001   | ------------->  |   on :4000    |
 --------------  <-------------   ---------------
```
Nous allons commencer par installer les plugins `grpc-gateway` et `swagger` pour protoc.
```bash
go get -u github.com/grpc-ecosystem/grpc-gateway/protoc-gen-grpc-gateway
go get -u github.com/grpc-ecosystem/grpc-gateway/protoc-gen-swagger
```
Nous allons maintenant modifer le fichier `prototool.yaml` pour générer le proxy et le json swagger.
```yaml
# prototool.yaml
protoc_includes:  
  - ../../src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis  
  
gen:  
 go_options: import_path: translator-service/  
  
  plugins:  
  - name: go  
      type: go  
      flags: plugins=grpc  
      output: .  
    - name: grpc-gateway  
      type: go  
      output: .  
    - name: swagger  
      type: go  
      output: swagger/.
```
Nous pouvons maintenant générer les fichiers Go.
```bash
prototool gen
```
Nous allons maintenant utiliser ce proxy qui a été généré et creer un fichier `proxy.go`.
```go
// proxy.go
package main  
  
import (  
	"context"  
	"net/http"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"google.golang.org/grpc"
	"translator-service/proto"
)  

func main() {  
	ctx := context.Background()  
	ctx, cancel := context.WithCancel(ctx)  
	defer cancel()  

	mux := runtime.NewServeMux()  
	opts := []grpc.DialOption{grpc.WithInsecure()}  
	proto.RegisterTranslatorHandlerFromEndpoint(ctx, mux, "localhost:4000", opts)  

	http.ListenAndServe(":8001", mux)  
}
```
On aurait  aussi pu faire un seul binaire et lancer le serveur gRPC dans une goroutine.
```go
// main.go
// ...
go s.Serve(lis)
//...
```
