{{/*
Create the name of the service account to use
*/}}
{{- define "staffPortalUi.serviceAccountName" -}}
{{- if .Values.serviceAccount.create -}}
{{ default (include "common.names.fullname" .) .Values.serviceAccount.name }}
{{- else -}}
{{ default "default" .Values.serviceAccount.name }}
{{- end -}}
{{- end -}}

{{/*
Return the proper Docker Image Staff Portal UI Secret Names
*/}}
{{- define "staffPortalUi.imagePullSecrets" -}}
{{- include "common.images.pullSecrets" (dict "images" (list .Values.image) "global" .Values.global) -}}
{{- end -}}

{{/*
Render Env values section
*/}}
{{- define "staffPortalUi.baseEnvVars" -}}
{{- $context := .context -}}
{{- range $k, $v := .envVars }}
- name: {{ $k }}
{{- if or (kindIs "int64" $v) (kindIs "float64" $v) (kindIs "bool" $v) }}
  value: {{ $v | quote }}
{{- else if kindIs "string" $v }}
  value: {{ include "common.tplvalues.render" ( dict "value" $v "context" $context ) | squote }}
{{- else }}
  valueFrom: {{- include "common.tplvalues.render" ( dict "value" $v "context" $context ) | nindent 4}}
{{- end }}
{{- end }}
{{- end -}}

{{- define "staffPortalUi.envVars" -}}
{{- $envVars := merge (deepCopy .Values.envVars) (deepCopy .Values.envVarsFrom) -}}
{{- include "staffPortalUi.baseEnvVars" (dict "envVars" $envVars "context" $) }}
{{- end -}}

{{/*
Local replacements for the Bitnami common chart helpers so this chart can be linted standalone.
*/}}
{{- define "common.tplvalues.render" -}}
{{- if kindIs "string" .value -}}
{{- tpl .value .context -}}
{{- else -}}
{{- tpl (.value | toYaml) .context -}}
{{- end -}}
{{- end -}}

{{- define "common.names.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "common.names.fullname" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := include "common.names.name" . -}}
{{- if eq .Release.Name $name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{- define "common.labels.standard" -}}
app.kubernetes.io/name: {{ include "common.names.name" .context }}
helm.sh/chart: {{ printf "%s-%s" .context.Chart.Name .context.Chart.Version | quote }}
app.kubernetes.io/instance: {{ .context.Release.Name }}
app.kubernetes.io/managed-by: {{ .context.Release.Service }}
{{- if .customLabels }}
{{ include "common.tplvalues.render" (dict "value" .customLabels "context" .context) }}
{{- end }}
{{- end -}}

{{- define "common.labels.matchLabels" -}}
app.kubernetes.io/name: {{ include "common.names.name" .context }}
app.kubernetes.io/instance: {{ .context.Release.Name }}
{{- if .customLabels }}
{{ include "common.tplvalues.render" (dict "value" .customLabels "context" .context) }}
{{- end }}
{{- end -}}

{{- define "common.images.image" -}}
{{- $tag := .imageRoot.tag | default "latest" -}}
{{- printf "%s:%s" .imageRoot.repository $tag -}}
{{- end -}}

{{- define "common.images.pullSecrets" -}}
{{- $secrets := list -}}
{{- range .images }}
  {{- if .pullSecrets }}
    {{- $secrets = concat $secrets .pullSecrets -}}
  {{- end }}
{{- end }}
{{- if and .global .global.imagePullSecrets }}
  {{- $secrets = concat $secrets .global.imagePullSecrets -}}
{{- end }}
{{- if $secrets }}
imagePullSecrets:
{{- range $secrets }}
  - name: {{ .name | default . }}
{{- end }}
{{- end }}
{{- end -}}

{{- define "common.capabilities.deployment.apiVersion" -}}
apps/v1
{{- end -}}

{{- define "common.capabilities.hpa.apiVersion" -}}
{{- if .Capabilities.APIVersions.Has "autoscaling/v2" -}}
autoscaling/v2
{{- else -}}
autoscaling/v2beta2
{{- end -}}
{{- end -}}

{{- define "common.affinities.pods" -}}
{}
{{- end -}}

{{- define "common.affinities.nodes" -}}
{}
{{- end -}}
