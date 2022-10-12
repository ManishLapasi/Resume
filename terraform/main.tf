provider "google" {
  project = "myresweb"
  region  = "us-central1"
  zone    = "us-central1-a"
}

resource "google_container_cluster" "primary" {
  name     = "my-gke-cluster"
  location = "us-central1-a"

  remove_default_node_pool = true
  initial_node_count       = 1
}

resource "google_container_node_pool" "primary_preemptible_nodes" {
  name       = "my-node-pool"
  location   = "us-central1-a"
  cluster    = google_container_cluster.primary.name
  node_count = 1

  node_config {
    preemptible  = true
    machine_type = "g1-small"
    oauth_scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
      "https://www.googleapis.com/auth/devstorage.read_only"
    ]
  }
}

resource "null_resource" "authSetup" {
  depends_on = [google_container_cluster.primary, google_container_node_pool.primary_preemptible_nodes]
  provisioner "local-exec" {
    command = "gcloud container clusters get-credentials my-gke-cluster --zone us-central1-a"
  }
}

resource "null_resource" "secretSetup" {
  depends_on = [null_resource.authSetup]
  provisioner "local-exec" {
    command = "kubectl create secret docker-registry my-secret --from-file=.dockerconfigjson=key.json"
  }
}

provider "kubernetes" {
  load_config_file = "false"
  host     = google_container_cluster.primary.endpoint
  client_certificate     = google_container_cluster.primary.master_auth.0.client_certificate
  client_key             = google_container_cluster.primary.master_auth.0.client_key
  cluster_ca_certificate = google_container_cluster.primary.master_auth.0.cluster_ca_certificate
}

resource "kubectl_manifest" "pod_deployment" {
  depends_on = [null_resource.secretSetup]
  yaml_body = file("../kubernetes/node-deployment.yml")
}

resource "kubectl_manifest" "service_deployment" {
  depends_on = [null_resource.secretSetup]
  yaml_body = file("../kubernetes/node-service.yml")
}