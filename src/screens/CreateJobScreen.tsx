import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { BrandWordmark } from '../components/BrandWordmark';
import { PrimaryButton } from '../components/PrimaryButton';
import type { JobCategory } from '../types';

export type EnderecoValues = {
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
};

export type CreateJobValues = { 
  title: string;
  category: JobCategory;
  description: string;
  endereco: EnderecoValues;
};

type CreateJobScreenProps = {
  onPublish: (values: CreateJobValues) => void;
  onCancel: () => void;
};

const JOB_CATEGORIES: JobCategory[] = [
  'Pedreiro',
  'Encanador',
  'Eletricista',
  'Gesseiro',
  'Ajudante',
  'Pintor',
];

type CreateJobField = 'title' | 'category' | 'description' | 'cep' | 'logradouro' | 'numero' | 'bairro' | 'cidade' | 'uf';
type FormErrors = Partial<Record<CreateJobField, string>>;

export function CreateJobScreen({ onPublish, onCancel }: CreateJobScreenProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<JobCategory | null>(null);
  const [description, setDescription] = useState('');
  
  // Substituído 'location' pelos campos do Endereco
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');

  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const errors: FormErrors = {};
    if (!title.trim()) {
      errors.title = 'Informe o título do serviço.';
    }
    if (!category) {
      errors.category = 'Selecione uma categoria.';
    }
    if (!description.trim()) {
      errors.description = 'Descreva o serviço que precisa ser feito.';
    }
    if (!cep.trim()) {
      errors.cep = 'Informe o CEP.';
    }
    if (!logradouro.trim()) {
      errors.logradouro = 'Informe o logradouro.';
    }
    if (!numero.trim()) {
      errors.numero = 'Informe o número.';
    }
    if (!bairro.trim()) {
      errors.bairro = 'Informe o bairro.';
    }
    if (!cidade.trim()) {
      errors.cidade = 'Informe a cidade.';
    }
    if (!uf.trim() || uf.trim().length !== 2) {
      errors.uf = 'Informe a UF (2 letras).';
    }
    return errors;
  };

  const errors = submitted ? validate() : {};

  const handlePublish = () => {
    setSubmitted(true);
    if (Object.keys(validate()).length > 0 || !category) {
      return;
    }

    onPublish({
      title: title.trim(),
      category,
      description: description.trim(),
      endereco: {
        cep: cep.trim(),
        logradouro: logradouro.trim(),
        numero: numero.trim(),
        complemento: complemento.trim() ? complemento.trim() : undefined,
        bairro: bairro.trim(),
        cidade: cidade.trim(),
        uf: uf.trim().toUpperCase(),
      },
    });
  };

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoiding}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.brandWrap}>
            <BrandWordmark />
          </View>

          <View style={styles.header}>
            <Text accessibilityRole="header" style={styles.title}>
              Publicar um serviço
            </Text>
            <Text style={styles.subtitle}>
              Conte aos profissionais o que você precisa
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Título do serviço</Text>
              <TextInput
                accessibilityLabel="Título do serviço"
                autoCapitalize="sentences"
                onChangeText={setTitle}
                placeholder="Ex.: Pintura de parede"
                placeholderTextColor="#8A8A8A"
                returnKeyType="next"
                style={styles.input}
                value={title}
              />
              {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Categoria</Text>
              <View style={styles.categoryList}>
                {JOB_CATEGORIES.map((item) => {
                  const selected = category === item;
                  return (
                    <Pressable
                      key={item}
                      accessibilityRole="radio"
                      accessibilityState={{ selected }}
                      onPress={() => setCategory(item)}
                      style={[
                        styles.categoryOption,
                        selected && styles.categoryOptionSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.categoryLabel,
                          selected && styles.categoryLabelSelected,
                        ]}
                      >
                        {item}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              {errors.category && (
                <Text accessibilityRole="alert" style={styles.errorText}>
                  {errors.category}
                </Text>
              )}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Descrição do serviço</Text>
              <TextInput
                accessibilityLabel="Descrição detalhada do serviço"
                autoCapitalize="sentences"
                multiline
                onChangeText={setDescription}
                placeholder="Explique o que precisa ser feito e outros detalhes importantes"
                placeholderTextColor="#8A8A8A"
                style={[styles.input, styles.descriptionInput]}
                textAlignVertical="top"
                value={description}
              />
              {errors.description && (
                <Text style={styles.errorText}>{errors.description}</Text>
              )}
            </View>

            {/* Secção de Endereço adaptada ao Back-end */}
            <Text style={[styles.label, { fontSize: 14, marginTop: 5, marginBottom: 10 }]}>Endereço do Serviço</Text>

            <View style={styles.rowFields}>
              <View style={[styles.fieldGroup, { flex: 1 }]}>
                <Text style={styles.label}>CEP</Text>
                <TextInput
                  accessibilityLabel="CEP"
                  keyboardType="numeric"
                  maxLength={9}
                  onChangeText={setCep}
                  placeholder="00000-000"
                  placeholderTextColor="#8A8A8A"
                  style={styles.input}
                  value={cep}
                />
                {errors.cep && <Text style={styles.errorText}>{errors.cep}</Text>}
              </View>

              <View style={[styles.fieldGroup, { width: 90 }]}>
                <Text style={styles.label}>UF</Text>
                <TextInput
                  accessibilityLabel="UF"
                  autoCapitalize="characters"
                  maxLength={2}
                  onChangeText={setUf}
                  placeholder="EX"
                  placeholderTextColor="#8A8A8A"
                  style={styles.input}
                  value={uf}
                />
                {errors.uf && <Text style={styles.errorText}>{errors.uf}</Text>}
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Logradouro</Text>
              <TextInput
                accessibilityLabel="Logradouro"
                autoCapitalize="words"
                onChangeText={setLogradouro}
                placeholder="Ex.: Rua Principal"
                placeholderTextColor="#8A8A8A"
                style={styles.input}
                value={logradouro}
              />
              {errors.logradouro && <Text style={styles.errorText}>{errors.logradouro}</Text>}
            </View>

            <View style={styles.rowFields}>
              <View style={[styles.fieldGroup, { flex: 1 }]}>
                <Text style={styles.label}>Número</Text>
                <TextInput
                  accessibilityLabel="Número"
                  onChangeText={setNumero}
                  placeholder="Ex.: 123"
                  placeholderTextColor="#8A8A8A"
                  style={styles.input}
                  value={numero}
                />
                {errors.numero && <Text style={styles.errorText}>{errors.numero}</Text>}
              </View>

              <View style={[styles.fieldGroup, { flex: 1.5 }]}>
                <Text style={styles.label}>Complemento (Opcional)</Text>
                <TextInput
                  accessibilityLabel="Complemento"
                  onChangeText={setComplemento}
                  placeholder="Ex.: Apto 42"
                  placeholderTextColor="#8A8A8A"
                  style={styles.input}
                  value={complemento}
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Bairro</Text>
              <TextInput
                accessibilityLabel="Bairro"
                autoCapitalize="words"
                onChangeText={setBairro}
                placeholder="Ex.: Centro"
                placeholderTextColor="#8A8A8A"
                style={styles.input}
                value={bairro}
              />
              {errors.bairro && <Text style={styles.errorText}>{errors.bairro}</Text>}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Cidade</Text>
              <TextInput
                accessibilityLabel="Cidade"
                autoCapitalize="words"
                onChangeText={setCidade}
                placeholder="Ex.: São Paulo"
                placeholderTextColor="#8A8A8A"
                style={styles.input}
                value={cidade}
              />
              {errors.cidade && <Text style={styles.errorText}>{errors.cidade}</Text>}
            </View>

            <View style={styles.pricingNotice}>
              <Text style={styles.pricingNoticeTitle}>Sobre o orçamento</Text>
              <Text style={styles.pricingNoticeText}>
                O preço será definido pelo profissional após visita e orçamento no local.
              </Text>
            </View>

            <View style={styles.actions}>
              <PrimaryButton
                title="Publicar vaga"
                onPress={handlePublish}
                backgroundColor="#FF6410"
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Cancelar e voltar"
                onPress={onCancel}
                style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FF5A00',
  },
  keyboardAvoiding: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  brandWrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: '#FFF1E8',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 14,
    shadowColor: '#1B1B1B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 15,
    elevation: 4,
  },
  fieldGroup: {
    marginBottom: 15,
  },
  rowFields: {
    flexDirection: 'row',
    gap: 10,
  },
  label: {
    color: '#26344B',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 14,
    color: '#1D1D1D',
    fontSize: 15,
    fontWeight: '600',
    minHeight: 50,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  descriptionInput: {
    minHeight: 112,
    paddingTop: 12,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryOption: {
    minHeight: 36,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 18,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 12,
  },
  categoryOptionSelected: {
    borderColor: '#FF6410',
    backgroundColor: '#FFF1E8',
  },
  categoryLabel: {
    color: '#5E5E5E',
    fontSize: 12,
    fontWeight: '700',
  },
  categoryLabelSelected: {
    color: '#A63D0A',
  },
  errorText: {
    color: '#B3261E',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
  pricingNotice: {
    borderRadius: 14,
    backgroundColor: '#FFF5EE',
    padding: 13,
    marginBottom: 16,
  },
  pricingNoticeTitle: {
    color: '#26344B',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '800',
  },
  pricingNoticeText: {
    color: '#5E5E5E',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 3,
  },
  actions: {
    marginTop: 2,
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    marginTop: 6,
  },
  cancelText: {
    color: '#FF6410',
    fontSize: 14,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
  },
});