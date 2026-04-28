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
