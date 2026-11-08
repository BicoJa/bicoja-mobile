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

type EditSkillsScreenProps = {
  skills: string[];
  onSave: (skills: string[]) => void;
  onCancel: () => void;
};

export function EditSkillsScreen({
  skills,
  onSave,
  onCancel,
}: EditSkillsScreenProps) {
  const [currentSkills, setCurrentSkills] = useState(skills);
  const [newSkill, setNewSkill] = useState('');
  const [error, setError] = useState('');

  const addSkill = () => {
    const skill = newSkill.trim();
    if (!skill) {
      setError('Digite uma habilidade para adicionar.');
      return;
    }
    if (currentSkills.some((item) => item.toLocaleLowerCase() === skill.toLocaleLowerCase())) {
      setError('Essa habilidade já está na lista.');
      return;
    }

    setCurrentSkills((items) => [...items, skill]);
    setNewSkill('');
    setError('');
  };

  const removeSkill = (skillToRemove: string) => {
    setCurrentSkills((items) => items.filter((skill) => skill !== skillToRemove));
    setError('');
  };

  const handleSave = () => {
    if (currentSkills.length === 0) {
      setError('Adicione pelo menos uma habilidade.');
      return;
    }

    onSave(currentSkills);
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
              Alterar habilidades
            </Text>
            <Text style={styles.subtitle}>
              Mantenha seus serviços atualizados no perfil
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Suas habilidades</Text>
            <Text style={styles.sectionHint}>
              Remova serviços ou adicione novas especialidades.
            </Text>

            {currentSkills.length > 0 ? (
              <View style={styles.skillList}>
                {currentSkills.map((skill) => (
                  <View key={skill} style={styles.skillChip}>
                    <Text style={styles.skillLabel}>{skill}</Text>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`Remover ${skill}`}
                      hitSlop={8}
                      onPress={() => removeSkill(skill)}
                      style={({ pressed }) => [
                        styles.removeButton,
                        pressed && styles.pressed,
                      ]}
                    >
                      <Text style={styles.removeLabel}>×</Text>
                    </Pressable>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.emptyState}>
                Ainda não há habilidades adicionadas.
              </Text>
            )}

            <View style={styles.addSection}>
              <Text style={styles.label}>Adicionar habilidade</Text>
              <TextInput
                accessibilityLabel="Nova habilidade ou categoria de serviço"
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={(value) => {
                  setNewSkill(value);
                  if (error) {
                    setError('');
                  }
                }}
                onSubmitEditing={addSkill}
                placeholder="Ex.: Eletricista"
                placeholderTextColor="#8A8A8A"
                returnKeyType="done"
                style={styles.input}
                value={newSkill}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Adicionar habilidade à lista"
                onPress={addSkill}
                style={({ pressed }) => [
                  styles.addButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.addButtonLabel}>Adicionar</Text>
              </Pressable>
            </View>

            {error ? (
              <Text accessibilityRole="alert" style={styles.errorText}>
                {error}
              </Text>
            ) : null}

            <View style={styles.actions}>
              <PrimaryButton
                title="Salvar alterações"
                onPress={handleSave}
                backgroundColor="#FF6410"
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Cancelar e voltar ao perfil"
                onPress={onCancel}
                style={({ pressed }) => [
                  styles.cancelButton,
                  pressed && styles.pressed,
                ]}
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
    paddingTop: 32,
    paddingBottom: 32,
  },
  brandWrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 18,
  },
  header: {
    alignItems: 'center',
    marginBottom: 18,
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
    marginTop: 6,
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
  sectionTitle: {
    color: '#26344B',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '800',
  },
  sectionHint: {
    color: '#6A6A6A',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },
  skillList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  skillChip: {
    minHeight: 38,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 19,
    backgroundColor: '#FFF1E8',
    paddingLeft: 13,
    paddingRight: 6,
  },
  skillLabel: {
    color: '#8F350C',
    fontSize: 13,
    fontWeight: '700',
  },
  removeButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 3,
    borderRadius: 14,
  },
  removeLabel: {
    color: '#A63D0A',
    fontSize: 21,
    lineHeight: 24,
    fontWeight: '700',
  },
  emptyState: {
    color: '#777777',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 14,
  },
  addSection: {
    marginTop: 22,
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
    minHeight: 52,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  addButton: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    minHeight: 40,
    paddingHorizontal: 4,
    marginTop: 4,
  },
  addButtonLabel: {
    color: '#FF6410',
    fontSize: 14,
    fontWeight: '800',
  },
  errorText: {
    color: '#B3261E',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
  actions: {
    marginTop: 14,
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
