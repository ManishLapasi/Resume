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
  }
}

resource "null_resource" "authSetup" {
  provisioner "local-exec" {
    command = "gcloud container clusters get-credentials my-gke-cluster"
  }
}

resource "kubectl_manifest" "pod_deployment" {
  depends_on = [null_resource.authSetup]
  yaml_body = file("../kubernetes/node-deployment.yml")
}

resource "kubectl_manifest" "service_deployment" {
  depends_on = [null_resource.authSetup]
  yaml_body = file("../kubernetes/node-service.yml")
}